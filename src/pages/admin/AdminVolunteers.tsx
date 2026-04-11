import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
        <Badge variant="secondary">{volunteers.length} total</Badge>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : volunteers.length === 0 ? (
        <p className="text-muted-foreground">No volunteer signups yet.</p>
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
