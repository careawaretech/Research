import { PulseFitHero } from "@/components/ui/pulse-fit-hero";

export default function TrainingProgramsSection() {
  return (
    <PulseFitHero
      logo="SeniorSafe"
      navigation={[
        { label: "Technology", onClick: () => window.location.href = '/technology' },
        { label: "Research", onClick: () => window.location.href = '/research-hub' },
        { label: "Partners", onClick: () => window.location.href = '/partners' },
        { label: "About", onClick: () => window.location.href = '/about-us' },
        { label: "Contact", onClick: () => window.location.href = '/contact' },
      ]}
      ctaButton={{
        label: "Get Started",
        onClick: () => window.location.href = '/contact',
      }}
      title="Privacy-First Monitoring Solutions"
      subtitle="Advanced wireless sensing technology for elderly care facilities. Monitor safety without cameras, protect dignity while ensuring security."
      primaryAction={{
        label: "Request Demo",
        onClick: () => window.location.href = '/contact',
      }}
      secondaryAction={{
        label: "View Technology",
        onClick: () => window.location.href = '/technology',
      }}
      disclaimer="*No credit card required for demo"
      socialProof={{
        avatars: [
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        ],
        text: "Trusted by 50+ care facilities",
      }}
      programs={[
        {
          image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=500&fit=crop",
          category: "ASSISTED LIVING",
          title: "Fall Detection & Prevention",
          onClick: () => window.location.href = '/technology',
        },
        {
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=500&fit=crop",
          category: "MEMORY CARE",
          title: "Activity Monitoring",
          onClick: () => window.location.href = '/technology',
        },
        {
          image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=500&fit=crop",
          category: "HEALTHCARE",
          title: "Vital Signs Tracking",
          onClick: () => window.location.href = '/clinical-validation',
        },
        {
          image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=500&fit=crop",
          category: "SENIOR LIVING",
          title: "Privacy-First Security",
          onClick: () => window.location.href = '/privacy',
        },
        {
          image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=400&h=500&fit=crop",
          category: "RESEARCH",
          title: "Clinical Validation Studies",
          onClick: () => window.location.href = '/research-hub',
        },
      ]}
    />
  );
}
