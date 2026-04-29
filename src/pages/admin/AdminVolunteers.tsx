import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCsv } from "@/lib/csv";
import EmptyState from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  interests: string | null;
  created_at: string;
}

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });
      setVolunteers((data as Volunteer[]) ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Volunteer Signups</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{volunteers.length} total</Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadCsv(volunteers, `volunteers-${new Date().toISOString().slice(0, 10)}.csv`)}
            disabled={volunteers.length === 0}
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : volunteers.length === 0 ? (
        <EmptyState title="No volunteer signups yet" description="When someone signs up via the Community page, they'll appear here." />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.email}</TableCell>
                  <TableCell className="text-muted-foreground">{v.interests || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(v.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminVolunteers;
