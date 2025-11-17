import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

interface ArticleContent {
  title: string;
  subtitle: string;
  health_data_content: string;
  health_data_bullets: string[];
  personnel_data_content: string;
  personnel_data_bullets: string[];
}

const SecurityComplianceArticle = () => {
  const [content, setContent] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("security_compliance_article")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching article:", error);
      } else if (data) {
        setContent({
          title: data.title,
          subtitle: data.subtitle || "",
          health_data_content: data.health_data_content,
          health_data_bullets: data.health_data_bullets as string[],
          personnel_data_content: data.personnel_data_content,
          personnel_data_bullets: data.personnel_data_bullets as string[],
        });
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Content Not Found</h1>
            <p className="text-muted-foreground">The article content could not be loaded.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {content.title}
            </h1>
            {content.subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Health Data Section */}
          <section className="mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Health Data
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground/90 leading-relaxed mb-8">
                  {content.health_data_content}
                </p>

                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Checklist for Gathering and Processing Health Data
                </h3>
                
                <ul className="space-y-3">
                  {content.health_data_bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Personnel Data Section */}
          <section className="mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Personnel Data
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground/90 leading-relaxed mb-8">
                  {content.personnel_data_content}
                </p>

                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Key Personnel Data Protection Issues
                </h3>
                
                <ul className="space-y-3">
                  {content.personnel_data_bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Reference Section */}
          <section className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground italic">
              This article was originally published on the SecureHospitals.eu online Hub. 
              For full references and further reading suggestions, please visit the original source.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default SecurityComplianceArticle;
