import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, HandHeart, MessageCircle, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  content: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const Community = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [storyForm, setStoryForm] = useState({ content: "" });
  const [volunteerForm, setVolunteerForm] = useState({ name: "", email: "", interests: "" });
  const [storyLoading, setStoryLoading] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [testimonialsRes, eventsRes] = await Promise.all([
        supabase.from("testimonials").select("*").eq("approved", true).order("created_at", { ascending: false }),
        supabase.from("events").select("*").order("date", { ascending: true }),
      ]);
      setTestimonials((testimonialsRes.data as Testimonial[]) ?? []);
      setEvents((eventsRes.data as Event[]) ?? []);
    };
    fetchData();
  }, []);

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.content.trim()) {
      toast({ title: "Please write your story", variant: "destructive" });
      return;
    }
    setStoryLoading(true);
    const { error } = await supabase.from("testimonials").insert({ content: storyForm.content.trim() });
    setStoryLoading(false);
    if (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    } else {
      toast({ title: "Thank you for sharing your story. It will be reviewed before publishing." });
      setStoryForm({ content: "" });
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name.trim() || !volunteerForm.email.trim()) {
      toast({ title: "Name and email are required", variant: "destructive" });
      return;
    }
    setVolunteerLoading(true);
    const { error } = await supabase.from("volunteers").insert({
      name: volunteerForm.name.trim(),
      email: volunteerForm.email.trim(),
      interests: volunteerForm.interests.trim() || null,
    });
    setVolunteerLoading(false);
    if (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    } else {
      toast({ title: "Welcome aboard! We'll be in touch soon." });
      setVolunteerForm({ name: "", email: "", interests: "" });
    }
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
          <Users className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Our Community</h1>
          <p className="text-lg text-muted-foreground">
            Together we are stronger. Share your story, join events, and volunteer for change.
          </p>
        </div>
      </motion.section>

      {testimonials.length > 0 && (
        <section className="py-12">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <Quote className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Community Stories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Card className="border-none shadow-md h-full">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground italic">"{t.content}"</p>
                      <p className="text-xs text-muted-foreground mt-4">
                        {new Date(t.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No upcoming events. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border-none shadow-md h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-primary font-medium">
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container max-w-xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Share Your Story</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Your story is anonymous. It will be reviewed before publishing to ensure safety.
                </p>
                <form onSubmit={handleStorySubmit} className="space-y-4">
                  <Textarea
                    placeholder="Share your experience, journey, or message of hope..."
                    value={storyForm.content}
                    onChange={(e) => setStoryForm({ content: e.target.value })}
                    rows={5}
                  />
                  <Button type="submit" className="w-full" disabled={storyLoading}>
                    {storyLoading ? "Submitting..." : "Share Anonymously"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-12" id="volunteer">
        <div className="container max-w-xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <HandHeart className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Become a Volunteer</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm((p) => ({ ...p, name: e.target.value }))}
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm((p) => ({ ...p, email: e.target.value }))}
                  />
                  <Textarea
                    placeholder="What areas interest you? (e.g., events, outreach, content, design)"
                    value={volunteerForm.interests}
                    onChange={(e) => setVolunteerForm((p) => ({ ...p, interests: e.target.value }))}
                    rows={3}
                  />
                  <Button type="submit" className="w-full" disabled={volunteerLoading}>
                    {volunteerLoading ? "Signing up..." : "Join as Volunteer"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
