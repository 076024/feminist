import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users as UsersIcon, ImageIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string | null;
}

const rsvpSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d][\d\s\-()]{5,}$/, "Use digits, spaces, +, -, () only"),
  guests: z.coerce.number().int().min(1, "At least 1").max(10, "Max 10 guests"),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: 1, message: "" });

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("events")
        .select("id, title, description, date, location, image_url")
        .order("date", { ascending: true });
      setEvents((data as EventItem[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const resetForm = () => setForm({ name: "", email: "", phone: "", guests: 1, message: "" });

  const handleSubmit = async (eventId: string) => {
    const parsed = rsvpSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("event_rsvps").insert({
      event_id: eventId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      guests: parsed.data.guests,
      message: parsed.data.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit RSVP. Please try again.");
      return;
    }
    toast.success("RSVP received — see you there!");
    resetForm();
    setOpenId(null);
  };

  const now = Date.now();
  const upcoming = events.filter((e) => new Date(e.date).getTime() >= now);
  const past = events.filter((e) => new Date(e.date).getTime() < now);

  return (
    <Layout>
      <SEO
        title="Events & RSVP"
        description="Join Feminist events: marches, workshops, and community gatherings. RSVP and volunteer to take part."
      />
      <section className="bg-gradient-to-br from-primary/10 via-accent/20 to-background py-16 md:py-24">
        <div className="container max-w-3xl text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-5xl font-bold"
          >
            Events & RSVP
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Show up. Speak up. Stand together. Reserve your spot at our upcoming gatherings — every voice matters.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Upcoming</h2>
          {loading ? (
            <p className="text-muted-foreground">Loading events…</p>
          ) : upcoming.length === 0 ? (
            <Card><CardContent className="py-10 text-center text-muted-foreground">
              No upcoming events right now. Check back soon.
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-shadow">
                    {ev.image_url ? (
                      <img src={ev.image_url} alt={ev.title} className="w-full h-44 object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-44 bg-muted flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl font-bold mb-2">{ev.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{ev.description}</p>
                      <div className="space-y-1 text-sm text-foreground/80 mb-5">
                        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /> {formatDate(ev.date)}</div>
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {ev.location}</div>
                      </div>
                      <Dialog
                        open={openId === ev.id}
                        onOpenChange={(o) => { setOpenId(o ? ev.id : null); if (!o) resetForm(); }}
                      >
                        <DialogTrigger asChild>
                          <Button className="mt-auto w-full"><UsersIcon className="h-4 w-4 mr-2" />RSVP</Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>RSVP — {ev.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <Label htmlFor="rsvp-name">Full name</Label>
                              <Input id="rsvp-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label htmlFor="rsvp-email">Email</Label>
                                <Input id="rsvp-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="rsvp-phone">Phone number</Label>
                                <Input id="rsvp-phone" type="tel" inputMode="tel" placeholder="+1 555 123 4567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="rsvp-guests">Number of attendees (incl. you)</Label>
                              <Input id="rsvp-guests" type="number" min={1} max={10} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="rsvp-message">Message / accessibility needs (optional)</Label>
                              <Textarea id="rsvp-message" rows={3} maxLength={500} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                            </div>
                            <Button onClick={() => handleSubmit(ev.id)} disabled={submitting} className="w-full">
                              {submitting ? "Submitting…" : "Confirm RSVP"}
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">
                              Your details stay private and are only visible to event organisers.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {past.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Past events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                {past.map((ev) => (
                  <Card key={ev.id} className="overflow-hidden border-none shadow-sm">
                    {ev.image_url && <img src={ev.image_url} alt={ev.title} className="w-full h-32 object-cover grayscale" loading="lazy" />}
                    <CardContent className="p-4">
                      <h3 className="font-heading text-lg font-semibold mb-1">{ev.title}</h3>
                      <p className="text-xs text-muted-foreground">{formatDate(ev.date)} · {ev.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;