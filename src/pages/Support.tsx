import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Phone, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const LOCAL_CONTACT = "+260977572269";

const hotlines = [
  { name: "Lifeline Zambia (Adults, 24/7)", number: "933", url: "https://clzambia.org/lifeline-993/", local: LOCAL_CONTACT },
  { name: "Childline Zambia (Children & Youth)", number: "116", url: "https://clzambia.org", local: LOCAL_CONTACT },
  { name: "Zambia Police GBV & Victim Support Unit", number: "991", url: "https://www.gender.gov.zm/?page_id=1616", local: LOCAL_CONTACT },
  { name: "YWCA Zambia GBV Support", number: "+260 211 252 726", url: "https://ywca.org.zm", local: LOCAL_CONTACT },
];

const resources = [
  { name: "Lifeline / Childline Zambia", url: "https://clzambia.org" },
  { name: "Gender Division — GBV Referral Pathway", url: "https://www.gender.gov.zm/?page_id=1616" },
  { name: "YWCA Zambia", url: "https://ywca.org.zm" },
  { name: "Zambia Police Victim Support Unit", url: "https://www.zambiapolice.gov.zm" },
  { name: "Women and Law in Southern Africa (WLSA Zambia)", url: "https://wlsazambia.org" },
  { name: "UN Women Zambia", url: "https://africa.unwomen.org/en/where-we-are/eastern-and-southern-africa/zambia" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const Support = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ message: "", category: "" });
  const [contactOpen, setContactOpen] = useState<null | { name: string; number: string }>(null);

  const waNumber = LOCAL_CONTACT.replace(/[^\d]/g, "");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim() || !formData.category) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("help_requests").insert({
      message: formData.message.trim(),
      category: formData.category,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Your message has been received. You are not alone." });
      setFormData({ message: "", category: "" });
    }
  };

  return (
    <Layout>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-primary-foreground py-16"
      >
        <div className="container max-w-3xl text-center space-y-4">
          <Shield className="h-12 w-12 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold">You Are Not Alone</h1>
          <p className="text-lg text-primary-foreground/80">
            If you or someone you know is experiencing violence, harassment, or discrimination — help is available. Everything shared here is confidential.
          </p>
        </div>
      </motion.section>

      <section className="py-12 bg-destructive/5">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Emergency Hotlines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotlines.map((h, i) => (
              <motion.div
                key={h.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card
                  className="border-destructive/20 shadow-md h-full cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setContactOpen({ name: h.name, number: h.local })}
                >
                  <CardContent className="pt-6 text-center space-y-2">
                    <Phone className="h-6 w-6 mx-auto text-primary" />
                    <h3 className="font-semibold text-sm">{h.name}</h3>
                    <p className="text-primary font-bold">{h.number}</p>
                    <p className="text-xs text-foreground/80">Local: <span className="font-semibold">{h.local}</span></p>
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-muted-foreground hover:text-primary flex items-center justify-center gap-1"
                    >
                      Visit website <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-none">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Anonymous Help Form</CardTitle>
                <p className="text-sm text-muted-foreground">
                  No personal information required. Your submission is completely anonymous.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Select value={formData.category} onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic_violence">Domestic Violence</SelectItem>
                      <SelectItem value="sexual_assault">Sexual Assault</SelectItem>
                      <SelectItem value="harassment">Harassment</SelectItem>
                      <SelectItem value="discrimination">Discrimination</SelectItem>
                      <SelectItem value="mental_health">Mental Health</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Tell us what's happening. We're here to help..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    rows={5}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Submit Anonymously"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">Support Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((r, i) => (
              <motion.a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm h-full">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{r.name}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!contactOpen} onOpenChange={(o) => !o && setContactOpen(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Contact {contactOpen?.name}</DialogTitle>
            <DialogDescription>
              Reach our local support line at <span className="font-semibold text-foreground">{contactOpen?.number}</span>. Choose how you'd like to connect.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
            <Button asChild variant="outline" className="w-full">
              <a href={`tel:${contactOpen?.number ?? ""}`}>
                <Phone className="h-4 w-4 mr-2" /> Call
              </a>
            </Button>
            <Button asChild className="w-full">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Support;
