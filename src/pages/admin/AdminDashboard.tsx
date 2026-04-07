import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Heart, Megaphone, Users } from "lucide-react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    helpRequests: 0,
    testimonials: 0,
    volunteers: 0,
    contacts: 0,
    blogPosts: 0,
    campaigns: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [hr, t, v, c, bp, cp] = await Promise.all([
        supabase.from("help_requests").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("volunteers").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("campaigns").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        helpRequests: hr.count ?? 0,
        testimonials: t.count ?? 0,
        volunteers: v.count ?? 0,
        contacts: c.count ?? 0,
        blogPosts: bp.count ?? 0,
        campaigns: cp.count ?? 0,
      });
    };
    fetchCounts();
  }, []);

  const cards = [
    { label: "Help Requests", value: counts.helpRequests, icon: MessageSquare, color: "text-destructive" },
    { label: "Testimonials", value: counts.testimonials, icon: Heart, color: "text-secondary-foreground" },
    { label: "Volunteers", value: counts.volunteers, icon: Users, color: "text-primary" },
    { label: "Blog Posts", value: counts.blogPosts, icon: FileText, color: "text-primary" },
    { label: "Campaigns", value: counts.campaigns, icon: Megaphone, color: "text-primary" },
    { label: "Contact Messages", value: counts.contacts, icon: MessageSquare, color: "text-muted-foreground" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
