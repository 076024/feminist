import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Rsvp {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  message: string | null;
  status: string;
  created_at: string;
}

interface EventOpt { id: string; title: string; date: string }

const statuses = ["pending", "confirmed", "cancelled"] as const;

const AdminEventRsvps = () => {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [events, setEvents] = useState<EventOpt[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    const [{ data: r }, { data: e }] = await Promise.all([
      supabase.from("event_rsvps").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("id,title,date").order("date", { ascending: false }),
    ]);
    setRsvps((r as Rsvp[]) ?? []);
    setEvents((e as EventOpt[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const eventTitle = (id: string) => events.find((e) => e.id === id)?.title ?? "—";

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("event_rsvps").update({ status }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success("Status updated");
    fetchAll();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("event_rsvps").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("RSVP deleted");
    fetchAll();
  };

  const filtered = filter === "all" ? rsvps : rsvps.filter((r) => r.event_id === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-3xl font-bold">Event RSVPs</h1>
          <Badge variant="secondary">{filtered.length}</Badge>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[260px]"><SelectValue placeholder="Filter by event" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All events</SelectItem>
            {events.map((e) => (
              <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-center">Guests</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No RSVPs yet</TableCell></TableRow>
              ) : filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium max-w-[180px] truncate">{eventTitle(r.event_id)}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell><a href={`mailto:${r.email}`} className="text-primary hover:underline">{r.email}</a></TableCell>
                  <TableCell><a href={`tel:${r.phone}`} className="text-primary hover:underline whitespace-nowrap">{r.phone}</a></TableCell>
                  <TableCell className="text-center">{r.guests}</TableCell>
                  <TableCell className="max-w-[220px] text-sm text-muted-foreground truncate">{r.message ?? "—"}</TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-[130px] h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
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

export default AdminEventRsvps;