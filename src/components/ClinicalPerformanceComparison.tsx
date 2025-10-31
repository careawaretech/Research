import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Clock, AlertTriangle, CheckCircle2, Calendar } from 'lucide-react';

const comparisonData = [
  {
    attribute: "Sensitivity",
    icon: CheckCircle2,
    radar: "98% True positive fall detection",
    wifi: "N/A"
  },
  {
    attribute: "Specificity",
    icon: CheckCircle2,
    radar: "99% True negative rate",
    wifi: "N/A"
  },
  {
    attribute: "Respiration Detection Accuracy",
    icon: Heart,
    radar: "N/A",
    wifi: "±5 bpm (85% accuracy in controlled environment)"
  },
  {
    attribute: "Motion Classification",
    icon: Activity,
    radar: "N/A",
    wifi: "85%+ (fall vs. normal activity distinction)"
  },
  {
    attribute: "Fall to Alert Response",
    icon: Clock,
    radar: "<2 seconds",
    wifi: "N/A"
  },
  {
    attribute: "False Alarms",
    icon: AlertTriangle,
    radar: "0.1% minimal staff disruption",
    wifi: "N/A"
  },
  {
    attribute: "Clinical Validation Timeline",
    icon: Calendar,
    radar: "Prototype clinical-grade results",
    wifi: "Phase II grant period: Multi-facility validation study planned"
  }
];

const ClinicalPerformanceComparison = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Clinical Performance Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Direct comparison of clinical metrics between our SFCW Radar system and WiFi Signal Analysis platform
          </p>
        </div>

        {/* Desktop/Tablet: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">SFCW Radar Performance</h3>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-secondary">WiFi Platform Progress</h3>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {comparisonData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={`radar-${index}`} className="contents">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="w-5 h-5 text-primary" />
                      {item.attribute}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-base ${item.radar === "N/A" ? "text-muted-foreground italic" : "text-foreground font-medium"}`}>
                      {item.radar}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="w-5 h-5 text-secondary" />
                      {item.attribute}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-base ${item.wifi === "N/A" ? "text-muted-foreground italic" : "text-foreground font-medium"}`}>
                      {item.wifi}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Mobile: Horizontal Scrollable Cards */}
        <div className="md:hidden">
          <div className="flex gap-4 mb-6 sticky top-0 bg-background z-10 py-4">
            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold text-primary">SFCW Radar</h3>
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold text-secondary">WiFi Platform</h3>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" role="region" aria-label="Clinical performance metrics comparison">
              <div className="flex gap-4 px-1">
                {comparisonData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex-none w-[90vw] max-w-md snap-center">
                      <div className="grid grid-cols-2 gap-3 h-full">
                        <Card className="border-primary/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm">
                              <Icon className="w-4 h-4 text-primary" />
                              <span className="text-xs">{item.attribute}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className={`text-sm ${item.radar === "N/A" ? "text-muted-foreground italic" : "text-foreground font-medium"}`}>
                              {item.radar}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border-secondary/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm">
                              <Icon className="w-4 h-4 text-secondary" />
                              <span className="text-xs">{item.attribute}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className={`text-sm ${item.wifi === "N/A" ? "text-muted-foreground italic" : "text-foreground font-medium"}`}>
                              {item.wifi}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {comparisonData.map((_, index) => (
                <div 
                  key={index} 
                  className="w-2 h-2 rounded-full bg-muted-foreground/30"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalPerformanceComparison;