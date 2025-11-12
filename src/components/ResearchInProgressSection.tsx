import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FlaskConical, Users, FileCheck, Lightbulb } from "lucide-react";
import { SectionTagBadge } from "@/components/admin/SectionTagBadge";

const ResearchInProgressSection = () => {
  const navigate = useNavigate();

  const highlights = [
    {
      icon: FlaskConical,
      text: "Advanced feasibility studies & prototyping"
    },
    {
      icon: FileCheck,
      text: "Applying for grant funding & securing patents"
    },
    {
      icon: Users,
      text: "Seeking collaborative partners & pilot participants"
    },
    {
      icon: Lightbulb,
      text: "Validating innovative wireless sensing technology"
    }
  ];

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <SectionTagBadge 
        sectionTag="research-in-progress" 
        adminPath="/admin/content/research-in-progress"
        enabled={false}
      />
      
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-semibold text-primary">Research in Progress</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Building the Future of Privacy-First Care Technology
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Care Aware Tech is a research-driven startup conducting advanced studies on wireless sensing 
          for real-time fall and vital sign detection in assisted living and memory care settings. 
          We're transforming innovative ideas into validated technology through grant funding and 
          collaborative partnerships.
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-foreground text-left font-medium">
                  {highlight.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={() => navigate('/contact')}
            className="text-base"
          >
            Partner With Us
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/technology')}
            className="text-base"
          >
            Explore Our Technology
          </Button>
        </div>

        {/* Footnote */}
        <p className="text-sm text-muted-foreground mt-8 italic">
          Interested in piloting our technology or learning more about our research journey?
        </p>
      </div>
    </section>
  );
};

export default ResearchInProgressSection;
