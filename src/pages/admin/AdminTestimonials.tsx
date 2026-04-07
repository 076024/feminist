import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

interface Testimonial {
  id: string;
  content: string;
  approved: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials((data as Testimonial[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const toggleApproval = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("testimonials").update({ approved }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success(approved ? "Testimonial approved" : "Testimonial rejected");
    fetchTestimonials();
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Testimonials</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Story</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : testimonials.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No testimonials</TableCell></TableRow>
              ) : testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="max-w-lg">{t.content}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {t.approved ? "Approved" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(t.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-1">
                    {!t.approved && (
                      <Button variant="ghost" size="icon" onClick={() => toggleApproval(t.id, true)}>
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    {t.approved && (
                      <Button variant="ghost" size="icon" onClick={() => toggleApproval(t.id, false)}>
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestimonials;
