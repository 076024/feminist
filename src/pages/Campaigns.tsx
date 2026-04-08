import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Share2 } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: string | null;
  status: string;
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
    if (!petitionForm.name.trim() || !petitionForm.email.trim()) {
      toast({ title: "Name and email are required", variant: "destructive" });
      return;
    }
    setSubmitLoading(true);
    const { error } = await supabase.from("petitions").insert({
      campaign_id: campaignId,
      signer_name: petitionForm.name.trim(),
      signer_email: petitionForm.email.trim(),
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

  const handleShare = (title: string) => {
    const url = window.location.href;
    const text = `I just signed the "${title}" petition. Join the fight for equality!`;
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  return (
    <Layout>
      <section className="bg-muted/50 py-16">
        <div className="container max-w-3xl text-center space-y-4">
          <Megaphone className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Campaigns & Advocacy</h1>
          <p className="text-lg text-muted-foreground">
            Your signature can change laws, your voice can change minds. Take action today.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl space-y-8">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading campaigns...</div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No active campaigns right now. Check back soon!</p>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <Card key={campaign.id} className="border-none shadow-lg overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="text-xs">Active Campaign</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(campaign.title)}>
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
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
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Campaigns;
