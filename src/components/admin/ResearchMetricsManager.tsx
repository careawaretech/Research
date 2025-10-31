import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

interface ResearchMetrics {
  id: string;
  total_publications: number;
  citation_count: number;
  h_index: number;
  auto_sync_enabled: boolean;
}

const ResearchMetricsManager = () => {
  const [metrics, setMetrics] = useState<ResearchMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    const { data, error } = await supabase
      .from("research_metrics")
      .select("*")
      .single();

    if (error) {
      toast.error("Failed to fetch metrics");
      return;
    }
    setMetrics(data);
  };

  const syncFromPublications = async () => {
    setLoading(true);
    const { data: publications, error } = await supabase
      .from("publications")
      .select("citation_count");

    if (error) {
      toast.error("Failed to sync from publications");
      setLoading(false);
      return;
    }

    const totalPubs = publications.length;
    const totalCitations = publications.reduce((sum, pub) => sum + (pub.citation_count || 0), 0);
    
    // Calculate h-index
    const sortedCitations = publications
      .map(p => p.citation_count || 0)
      .sort((a, b) => b - a);
    
    let hIndex = 0;
    for (let i = 0; i < sortedCitations.length; i++) {
      if (sortedCitations[i] >= i + 1) {
        hIndex = i + 1;
      } else {
        break;
      }
    }

    if (metrics) {
      const { error: updateError } = await supabase
        .from("research_metrics")
        .update({
          total_publications: totalPubs,
          citation_count: totalCitations,
          h_index: hIndex,
        })
        .eq("id", metrics.id);

      if (updateError) {
        toast.error("Failed to update metrics");
      } else {
        toast.success("Metrics synced from publications");
        fetchMetrics();
      }
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!metrics) return;

    const { error } = await supabase
      .from("research_metrics")
      .update({
        total_publications: metrics.total_publications,
        citation_count: metrics.citation_count,
        h_index: metrics.h_index,
        auto_sync_enabled: metrics.auto_sync_enabled,
      })
      .eq("id", metrics.id);

    if (error) {
      toast.error("Failed to update metrics");
      return;
    }
    toast.success("Metrics updated");
  };

  if (!metrics) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auto-Sync Settings</CardTitle>
          <CardDescription>
            When enabled, metrics will automatically update from the publications database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-sync">Auto-sync from Publications</Label>
            <Switch
              id="auto-sync"
              checked={metrics.auto_sync_enabled}
              onCheckedChange={(checked) => setMetrics({ ...metrics, auto_sync_enabled: checked })}
            />
          </div>
          <Button onClick={syncFromPublications} disabled={loading} className="w-full">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Now from Publications
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Override</CardTitle>
          <CardDescription>
            You can manually adjust these values if needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Total Publications</Label>
            <Input
              type="number"
              value={metrics.total_publications}
              onChange={(e) => setMetrics({ ...metrics, total_publications: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label>Citation Count</Label>
            <Input
              type="number"
              value={metrics.citation_count}
              onChange={(e) => setMetrics({ ...metrics, citation_count: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label>h-index</Label>
            <Input
              type="number"
              value={metrics.h_index || 0}
              onChange={(e) => setMetrics({ ...metrics, h_index: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Button onClick={handleUpdate} className="w-full">
            Update Metrics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchMetricsManager;
