import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Share2 } from "lucide-react";

const campaigns = [
  {
    id: "equal-pay",
    title: "Equal Pay Now",
    description: "Demand legislation requiring companies to report and close gender pay gaps. Every woman deserves to earn the same as her male counterpart for equal work.",
    goal: 10000,
    current: 7823,
    status: "active" as const,
  },
  {
    id: "end-gbv",
    title: "End Gender-Based Violence",
    description: "Advocate for stronger laws and better support systems for survivors of domestic violence and sexual assault.",
    goal: 15000,
    current: 12456,
    status: "active" as const,
  },
  {
    id: "education-access",
    title: "Education for Every Girl",
    description: "Support initiatives to ensure every girl has access to quality education, regardless of where she is born.",
    goal: 8000,
    current: 5234,
    status: "active" as const,
  },
];

const Campaigns = () => {
  const { toast } = useToast();
  const [signingId, setSigningId] = useState<string | null>(null);
  const [petitionForm, setPetitionForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSign = async (campaignId: string) => {
    if (!petitionForm.name.trim() || !petitionForm.email.trim()) {
      toast({ title: "Name and email are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("petitions").insert({
      campaign_id: campaignId,
      signer_name: petitionForm.name.trim(),
      signer_email: petitionForm.email.trim(),
    });
    setLoading(false);
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
          {campaigns.map((campaign) => (
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
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-primary">{campaign.current.toLocaleString()} signatures</span>
                    <span className="text-muted-foreground">Goal: {campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.current / campaign.goal) * 100} className="h-2" />
                </div>

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
                      <Button onClick={() => handleSign(campaign.id)} className="flex-1" disabled={loading}>
                        {loading ? "Signing..." : "Sign Petition"}
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
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Campaigns;
