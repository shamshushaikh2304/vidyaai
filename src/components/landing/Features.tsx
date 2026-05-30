import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Brain,
  Calendar,
  Camera,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassCard, GlowBadge } from "./shared";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  size: "large" | "medium" | "small";
  detail?: string;
};

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    desc: "Maps your knowledge gaps in real-time and builds a personalized curriculum that evolves with you.",
    color: "#FF6B35",
    size: "large",
    detail: "540K+ learning paths generated",
  },
  {
    icon: Camera,
    title: "Photo Doubt Solver",
    desc: "Snap any question. Get step-by-step explanation in 3 seconds.",
    color: "#00C9A7",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Exam Intelligence",
    desc: "Trained on 15 years of UPSC, JEE, NEET papers. Predicts what's likely to appear.",
    color: "#845EC2",
    size: "medium",
  },
  {
    icon: Calendar,
    title: "Smart Study Planner",
    desc: "Enter your exam date. Get a day-by-day adaptive plan.",
    color: "#FF9671",
    size: "small",
  },
  {
    icon: Target,
    title: "Mock Test Analytics",
    desc: "Deep insights into every mistake. Know exactly where to improve.",
    color: "#00C9A7",
    size: "medium",
  },
  {
    icon: Award,
    title: "Peer Leaderboards",
    desc: "Compete with lakhs of students. Weekly challenges and merit badges.",
    color: "#FF6B35",
    size: "large",
    detail: "2.3M+ mock tests taken",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <GlowBadge color="#845EC2">Features</GlowBadge>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Everything You Need
            <br />
            <span className="text-zinc-500">to Ace Any Exam</span>
          </h2>
        </motion.div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={
                feature.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : feature.size === "medium"
                    ? "md:col-span-2"
                    : ""
              }
            >
              <GlassCard
                className={`flex h-full flex-col p-6 ${feature.size === "large" ? "justify-between" : ""}`}
              >
                <div>
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${feature.color}18` }}
                  >
                    <feature.icon size={22} style={{ color: feature.color }} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{feature.desc}</p>
                </div>
                {feature.detail && (
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <span className="text-xs font-semibold" style={{ color: feature.color }}>
                      {feature.detail}
                    </span>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
