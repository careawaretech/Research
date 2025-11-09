import { motion } from "framer-motion";

export default function TrainingProgramsSection() {
  const programs = [
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
  ];

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
          <div className="flex flex-row -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
              alt="User 1"
              className="rounded-full border-2 border-background w-10 h-10 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
              alt="User 2"
              className="rounded-full border-2 border-background w-10 h-10 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              alt="User 3"
              className="rounded-full border-2 border-background w-10 h-10 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              alt="User 4"
              className="rounded-full border-2 border-background w-10 h-10 object-cover"
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Trusted by 50+ care facilities
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
          {[...programs, ...programs].map((program, index) => (
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
