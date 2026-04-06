import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, HandHeart, MessageCircle } from "lucide-react";

const events = [
  { title: "International Women's Day Rally", date: "March 8, 2025", location: "City Hall Plaza", description: "Join thousands as we march for equality and celebrate women's achievements worldwide." },
  { title: "Self-Defense Workshop", date: "March 22, 2025", location: "Community Center", description: "Free self-defense class for women and non-binary individuals. No experience needed." },
  { title: "Feminist Book Club", date: "Every 2nd Saturday", location: "Online (Zoom)", description: "Discuss powerful feminist literature in a supportive, welcoming community." },
];

const Community = () => {
  const { toast } = useToast();
  const [storyForm, setStoryForm] = useState({ content: "" });
  const [volunteerForm, setVolunteerForm] = useState({ name: "", email: "", interests: "" });
  const [storyLoading, setStoryLoading] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);

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
      <section className="bg-muted/50 py-16">
        <div className="container max-w-3xl text-center space-y-4">
          <Users className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Our Community</h1>
          <p className="text-lg text-muted-foreground">
            Together we are stronger. Share your story, join events, and volunteer for change.
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.title} className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-primary font-medium">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-12 bg-muted/50">
        <div className="container max-w-xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Share Your Story</h2>
          </div>
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
        </div>
      </section>

      {/* Volunteer */}
      <section className="py-12" id="volunteer">
        <div className="container max-w-xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <HandHeart className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Become a Volunteer</h2>
          </div>
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
        </div>
      </section>
    </Layout>
  );
};

export default Community;
