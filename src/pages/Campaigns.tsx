import { useEffect, useState } from "react";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const petitionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Please enter a valid email").max(254),
});

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: string | null;
  status: string;
  image_url: string | null;
}

const Campaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingId, setSigningId] = useState<string | null>(null);
  const [petitionForm, setPetitionForm] = useState({ name: "", email: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await supabase
        .from("campaigns")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      setCampaigns((data as Campaign[]) ?? []);
      setLoading(false);
    };
    fetchCampaigns();
  }, []);

  const handleSign = async (campaignId: string) => {
    const parsed = petitionSchema.safeParse(petitionForm);
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitLoading(true);
    const { error } = await supabase.from("petitions").insert({
      campaign_id: campaignId,
      signer_name: parsed.data.name,
      signer_email: parsed.data.email,
    });
    setSubmitLoading(false);
    if (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    } else {
      toast({ title: "Thank you for signing! Your voice matters." });
      setPetitionForm({ name: "", email: "" });
      setSigningId(null);
    }
  };

  const shareUrl = window.location.href;

  const shareOnTwitter = (title: string) => {
    const text = encodeURIComponent(`I support "${title}". Join the fight for equality!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnWhatsApp = (title: string) => {
    const text = encodeURIComponent(`I support "${title}". Join the fight for equality! ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <Layout>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-muted/50 py-16"
      >
        <div className="container max-w-3xl text-center space-y-4">
          <Megaphone className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Campaigns & Advocacy</h1>
          <p className="text-lg text-muted-foreground">
            Your signature can change laws, your voice can change minds. Take action today.
          </p>
        </div>
      </motion.section>

      <section className="py-12">
        <div className="container max-w-3xl space-y-8">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading campaigns...</div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No active campaigns right now. Check back soon!</p>
            </div>
          ) : (
            campaigns.map((campaign, i) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card className="border-none shadow-lg overflow-hidden">
                  {campaign.image_url && (
                    <img
                      src={campaign.image_url}
                      alt={campaign.title}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="text-xs">Active Campaign</Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => shareOnTwitter(campaign.title)} title="Share on X">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={shareOnFacebook} title="Share on Facebook">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => shareOnWhatsApp(campaign.title)} title="Share on WhatsApp">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">{campaign.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{campaign.description}</p>
                    {campaign.goal && (
                      <p className="text-sm font-medium text-primary">Goal: {campaign.goal}</p>
                    )}

                    {signingId === campaign.id ? (
                      <div className="space-y-3 pt-2 border-t">
                        <Input
                          placeholder="Your name"
                          value={petitionForm.name}
                          onChange={(e) => setPetitionForm((p) => ({ ...p, name: e.target.value }))}
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={petitionForm.email}
                          onChange={(e) => setPetitionForm((p) => ({ ...p, email: e.target.value }))}
                        />
                        <div className="flex gap-2">
                          <Button onClick={() => handleSign(campaign.id)} className="flex-1" disabled={submitLoading}>
                            {submitLoading ? "Signing..." : "Sign Petition"}
                          </Button>
                          <Button variant="outline" onClick={() => setSigningId(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setSigningId(campaign.id)} className="w-full">
                        Sign This Petition
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Campaigns;
