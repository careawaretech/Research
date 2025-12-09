"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { BarChart3, TrendingUp, FolderOpen, Bot, LayoutGrid } from "lucide-react";

const tabs = [
  {
    value: "insights",
    label: "Insights",
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  {
    value: "metrics",
    label: "Metrics",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  },
  {
    value: "trends",
    label: "Trends",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop",
  },
  {
    value: "sources",
    label: "Sources",
    icon: FolderOpen,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=800&fit=crop",
  },
  {
    value: "models",
    label: "Models",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop",
  },
];

interface Hero195Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function Hero195({
  title = "Privacy-First Elderly Care Technology",
  subtitle = "No cameras. Ever. Our radar and WiFi-based monitoring protects seniors with clinical-grade accuracy while preserving complete privacy and dignity.",
  buttonText = "Learn More",
  onButtonClick,
}: Hero195Props) {
  const [activeTab, setActiveTab] = React.useState("insights");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            {subtitle}
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={onButtonClick}
            className="mb-12"
          >
            {buttonText}
          </Button>

          {/* Tabs with Dashboard Preview */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-4xl"
          >
            <TabsList className="mb-6 bg-muted/50 p-1 rounded-full h-auto flex-wrap gap-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  {/* Border Beam Effect */}
                  <BorderBeam
                    size={250}
                    duration={12}
                    colorFrom="#2563eb"
                    colorTo="#9333ea"
                    borderWidth={2}
                  />
                  
                  {/* Dashboard Image */}
                  <img
                    src={tab.image}
                    alt={`${tab.label} Dashboard`}
                    className="w-full aspect-video object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default Hero195;
