import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Petition {
  id: string;
  campaign_id: string;
  signer_name: string;
  signer_email: string;
  created_at: string;
}

interface Campaign {
  id: string;
  title: string;
}

const AdminPetitions = () => {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [petitionsRes, campaignsRes] = await Promise.all([
        supabase.from("petitions").select("*").order("created_at", { ascending: false }),
        supabase.from("campaigns").select("id, title"),
      ]);
      setPetitions((petitionsRes.data as Petition[]) ?? []);
      setCampaigns((campaignsRes.data as Campaign[]) ?? []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = selectedCampaign === "all"
    ? petitions
    : petitions.filter((p) => p.campaign_id === selectedCampaign);

  const getCampaignTitle = (id: string) =>
    campaigns.find((c) => c.id === id)?.title ?? "Unknown Campaign";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Petition Signatures</h1>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{filtered.length} signatures</Badge>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No signatures yet.</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.signer_name}</TableCell>
                  <TableCell>{p.signer_email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{getCampaignTitle(p.campaign_id)}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString()}
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

export default AdminPetitions;
