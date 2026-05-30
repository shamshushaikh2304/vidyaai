import { motion } from "framer-motion";
import { Globe, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedCounter, GlassCard, fadeUp, staggerContainer } from "./shared";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

const STATS: Stat[] = [
  { value: 540000, suffix: "+", label: "Students learning monthly", icon: Users, color: "#FF6B35" },
  { value: 98, suffix: "%", label: "Improvement in test scores", icon: TrendingUp, color: "#00C9A7" },
  { value: 14, suffix: "+", label: "Indian languages supported", icon: Globe, color: "#845EC2" },
];

export default function Stats() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i}>
              <GlassCard className="group p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-transform group-hover:scale-110">
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="mb-2 text-5xl font-extrabold" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
