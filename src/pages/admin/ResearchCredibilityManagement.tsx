import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, BarChart3, Handshake, ListChecks, FileText } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import TeamMembersManager from "@/components/admin/TeamMembersManager";
import AcademicPartnersManager from "@/components/admin/AcademicPartnersManager";
import ResearchMetricsManager from "@/components/admin/ResearchMetricsManager";
import CollaborationOpportunitiesManager from "@/components/admin/CollaborationOpportunitiesManager";
import GrantProgressManager from "@/components/admin/GrantProgressManager";
import SectionContentManager from "@/components/admin/SectionContentManager";

const ResearchCredibilityManagement = () => {
  const [activeTab, setActiveTab] = useState("section");

  return (
    <AdminLayout>
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Research Credibility & Publications</h1>
        <p className="text-muted-foreground">
          Manage team members, partnerships, metrics, opportunities, and grant progress.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto">
          <TabsTrigger value="section" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Section</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Partners</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            <span className="hidden sm:inline">Opportunities</span>
          </TabsTrigger>
          <TabsTrigger value="grants" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <span className="hidden sm:inline">Grants</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="section">
          <Card>
            <CardHeader>
              <CardTitle>Section Title & Subtitle</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Founding Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <TeamMembersManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Academic Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <AcademicPartnersManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Research Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResearchMetricsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration & Partnership Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <CollaborationOpportunitiesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grants">
          <Card>
            <CardHeader>
              <CardTitle>Grant Status & Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <GrantProgressManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </AdminLayout>
  );
};

export default ResearchCredibilityManagement;
