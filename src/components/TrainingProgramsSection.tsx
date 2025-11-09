import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

  const programs = solutions.map((solution) => ({
    image: solution.image_url || "",
    category: solution.category,
    title: solution.title,
    onClick: () => {
      if (solution.link_url) {
        window.location.href = solution.link_url;
      }
    },
  }));

  const socialProof = sectionContent?.socialProof || {
    text: "Trusted by 50+ care facilities",
    avatars: [],
  };

  return (
    <section className="relative w-full py-16 bg-background">
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
            x: [0, -((programs.length * 380) / 2)],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: programs.length * 3,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate programs for seamless loop */}
          {programs.length > 0 && [...programs, ...programs].map((program, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={program.onClick}
              className="flex-shrink-0 cursor-pointer relative overflow-hidden rounded-3xl shadow-lg"
              style={{
                width: "356px",
                height: "480px",
              }}
            >
              {/* Image */}
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  {program.category}
                </span>
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {program.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
