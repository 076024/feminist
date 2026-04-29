import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const schema = z.string().trim().email().max(255);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    // Reuse contacts table with a marker — keeps schema simple
    const { error } = await supabase.from("contacts").insert({
      name: "Newsletter Signup",
      email: parsed.data,
      message: "[NEWSLETTER] Subscribed via newsletter form",
    });
    setLoading(false);
    if (error) {
      toast.error("Couldn't subscribe — please try again");
      return;
    }
    toast.success("Subscribed! Watch your inbox for updates.");
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-9"
          required
          aria-label="Email address"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
};

export default Newsletter;