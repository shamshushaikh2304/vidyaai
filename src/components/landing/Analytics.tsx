import { useState } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";
import { GlassCard, GlowBadge } from "./shared";

const SUBJECTS = ["Physics", "Chemistry", "Math", "Biology"] as const;
type Subject = (typeof SUBJECTS)[number];

type SubjectInsight = {
  accuracy: number;
  weak: string[];
  strong: string[];
};

const SUBJECT_DATA: Record<Subject, SubjectInsight> = {
  Physics: {
    accuracy: 78,
    weak: ["Rotational Motion", "Electromagnetism"],
    strong: ["Mechanics", "Optics"],
  },
  Chemistry: {
    accuracy: 85,
    weak: ["Organic Chemistry"],
    strong: ["Physical Chemistry", "Inorganic"],
  },
  Math: {
    accuracy: 72,
    weak: ["Calculus", "Coordinate Geometry"],
    strong: ["Algebra", "Statistics"],
  },
  Biology: {
    accuracy: 91,
    weak: ["Genetics"],
    strong: ["Ecology", "Human Physiology"],
  },
};

export default function Analytics() {
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Physics");
  const data = SUBJECT_DATA[selectedSubject];

  return (
    <section id="analytics" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <GlowBadge color="#845EC2">Analytics</GlowBadge>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Know Exactly Where
            <br />
            <span className="text-zinc-500">You Stand</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <GlassCard className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Subject Performance</h3>
            <div className="space-y-2">
              {SUBJECTS.map((subj) => (
                <motion.button
                  key={subj}
                  type="button"
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedSubject(subj)}
                  className={`flex w-full items-center justify-between rounded-xl p-3 text-sm transition-all ${
                    selectedSubject === subj
                      ? "border border-white/10 bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  <span>{subj}</span>
                  <span
                    className={`font-semibold ${
                      SUBJECT_DATA[subj].accuracy > 80
                        ? "text-[#00C9A7]"
                        : SUBJECT_DATA[subj].accuracy > 75
                          ? "text-[#FF9671]"
                          : "text-[#FF6B35]"
                    }`}
                  >
                    {SUBJECT_DATA[subj].accuracy}%
                  </span>
                </motion.button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center justify-center p-6">
            <h3 className="mb-6 text-sm font-semibold text-white">{selectedSubject} Accuracy</h3>
            <div className="relative h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={data.accuracy > 80 ? "#00C9A7" : data.accuracy > 75 ? "#FF9671" : "#FF6B35"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 264" }}
                  whileInView={{ strokeDasharray: `${data.accuracy * 2.64} 264` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-white">{data.accuracy}%</span>
                <span className="text-xs text-zinc-500">Accuracy</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Insights</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#00C9A7]">
                  <TrendingUp size={12} /> Strong Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.strong.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-[#00C9A7]/20 bg-[#00C9A7]/10 px-2.5 py-1 text-xs font-medium text-[#00C9A7]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35]">
                  <Target size={12} /> Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.weak.map((w) => (
                    <span
                      key={w}
                      className="rounded-lg border border-[#FF6B35]/20 bg-[#FF6B35]/10 px-2.5 py-1 text-xs font-medium text-[#FF6B35]"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
