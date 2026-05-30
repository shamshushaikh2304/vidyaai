import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GlassCard, GlowBadge } from "./shared";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  color: string;
  text: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ananya Sharma",
    role: "NEET 2024 — AIR 312",
    avatar: "A",
    color: "#FF6B35",
    text: "I failed NEET twice. VidyaAI showed me exactly which chapters I was weak in and why. Third attempt — AIR 312. I still can't believe it.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "IIT Bombay, CSE",
    avatar: "R",
    color: "#00C9A7",
    text: "The step-by-step photo solving feature is insane. I'd click a JEE problem at midnight and get a full explanation in seconds. Cleared with 98.6 percentile.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "UPSC CSE 2024 — Selected",
    avatar: "P",
    color: "#845EC2",
    text: "Preparing in Malayalam was something I never thought was possible. VidyaAI let me think and learn in my own language. It changed everything.",
    rating: 5,
  },
  {
    name: "Karthik Rajan",
    role: "CAT 2024 — 99.2 percentile",
    avatar: "K",
    color: "#FF9671",
    text: "The exam intelligence predictions were scary accurate. 3 out of 5 DILR sets I saw in CAT were ones VidyaAI had flagged as 'high probability'. Madness.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <GlowBadge color="#FF9671">Testimonials</GlowBadge>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Real Students.
            <br />
            <span className="text-zinc-500">Real Results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="flex h-full flex-col p-6">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-300">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
