import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SectionTagBadge } from "@/components/admin/SectionTagBadge";

interface CareSolution {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  link_url: string | null;
  visible: boolean;
}

interface SocialProof {
  text: string;
  avatars: string[];
}

export default function TrainingProgramsSection() {
  const { data: solutions = [] } = useQuery({
    queryKey: ["care-solutions-showcase"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_solutions_showcase")
        .select("*")
        .eq("visible", true)
        .order("display_order");
      if (error) throw error;
      return data as CareSolution[];
    },
  });

  const { data: sectionContent } = useQuery({
    queryKey: ["section-content", "care-solutions-showcase"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("section_content")
        .select("content")
        .eq("section_key", "care-solutions-showcase")
        .single();
      if (error) throw error;
      const content = data?.content as any;
      return content as { socialProof: SocialProof } | undefined;
    },
  });

  const socialProof = sectionContent?.socialProof || {
    text: "Trusted by 50+ care facilities",
    avatars: [],
  };

  if (solutions.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-16 bg-background">
      <SectionTagBadge sectionTag="care-solutions-showcase" adminPath="/admin/care-solutions-showcase" />
      
      {/* Social Proof */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-row items-center justify-center gap-3"
        >
          {socialProof.avatars && socialProof.avatars.length > 0 && (
            <div className="flex flex-row -space-x-2">
              {socialProof.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`User ${index + 1}`}
                  className="rounded-full border-2 border-background w-10 h-10 object-cover"
                />
              ))}
            </div>
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {socialProof.text}
          </span>
        </motion.div>
      </div>

      {/* Program Cards Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-hidden"
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none w-[150px] bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none w-[150px] bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling Container */}
        <motion.div
          className="flex items-center gap-6 pl-6"
          animate={{
            x: [0, -((solutions.length * 380) / 2)],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: solutions.length * 3,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate solutions for seamless loop */}
          {[...solutions, ...solutions].map((solution, index) => (
            <motion.div
              key={`${solution.id}-${index}`}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={() => solution.link_url && (window.location.href = solution.link_url)}
              className="flex-shrink-0 cursor-pointer relative overflow-hidden rounded-3xl shadow-lg"
              style={{
                width: "356px",
                height: "480px",
              }}
            >
              {/* Image */}
              <img
                src={solution.image_url || "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=500&fit=crop"}
                alt={solution.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  {solution.category}
                </span>
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {solution.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
