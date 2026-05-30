import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  Camera,
  Play,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { GlassCard, GlowBadge } from "./shared";

function HeroDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "JEE Prep", color: "#FF6B35" },
    { label: "UPSC", color: "#00C9A7" },
    { label: "NEET", color: "#845EC2" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="perspective-1000 relative mx-auto mt-12 w-full max-w-4xl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F16]/80 shadow-2xl shadow-black/50 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  activeTab === i ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={activeTab === i ? { background: `${tab.color}30`, color: tab.color } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
          <GlassCard className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Target size={14} className="text-[#FF6B35]" />
              <span className="text-xs font-medium text-zinc-400">Daily Target</span>
            </div>
            <div className="mb-1 text-2xl font-bold text-white">87%</div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5D]"
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">26/30 problems solved</p>
          </GlassCard>

          <GlassCard className="p-4 md:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <Brain size={14} className="text-[#00C9A7]" />
              <span className="text-xs font-medium text-zinc-400">AI Tutor — Organic Chemistry</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex gap-2">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B35]/20">
                  <span className="text-[10px] font-bold text-[#FF6B35]">S</span>
                </div>
                <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white/5 px-3 py-2 text-xs text-zinc-300">
                  Explain SN2 reaction mechanism with an example?
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <div className="max-w-[85%] rounded-lg rounded-tr-none border border-[#00C9A7]/20 bg-[#00C9A7]/10 px-3 py-2 text-xs text-zinc-200">
                  <span className="font-semibold text-[#00C9A7]">SN2</span> is a backside attack where
                  nucleophile attacks 180° opposite to leaving group.
                </div>
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00C9A7]/20">
                  <Brain size={12} className="text-[#00C9A7]" />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 md:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[#845EC2]" />
                <span className="text-xs font-medium text-zinc-400">Performance Trend</span>
              </div>
              <span className="text-xs font-semibold text-[#00C9A7]">+23% this month</span>
            </div>
            <div className="flex h-20 items-end gap-1">
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    background: i === 11 ? "#FF6B35" : "rgba(255,255,255,0.1)",
                    opacity: i === 11 ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Zap size={14} className="text-yellow-500" />
              <span className="text-xs font-medium text-zinc-400">Quick Actions</span>
            </div>
            <div className="space-y-2">
              {[
                { icon: Camera, label: "Solve Photo", color: "#FF6B35" },
                { icon: BookOpen, label: "Mock Test", color: "#00C9A7" },
                { icon: Calendar, label: "Study Plan", color: "#845EC2" },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  type="button"
                  whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-zinc-300 transition-colors"
                >
                  <action.icon size={14} style={{ color: action.color }} />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-[#FF6B35]/10 via-[#845EC2]/10 to-[#00C9A7]/10 blur-3xl" />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #FF6B35 0%, #845EC2 50%, transparent 70%)",
          }}
        />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#00C9A7] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#845EC2] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GlowBadge color="#FF6B35">🇮🇳 Built for Bharat&apos;s 600M Students</GlowBadge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-white">Study </span>
          <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8F5D] bg-clip-text text-transparent">
            smarter.
          </span>
          <br />
          <span className="text-white">Score </span>
          <span className="bg-gradient-to-r from-[#00C9A7] to-[#00E5C0] bg-clip-text text-transparent">
            higher.
          </span>
          <br />
          <span className="text-zinc-500">In your language.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          India&apos;s first AI tutor that adapts to <em>your</em> thinking — in 12 regional languages,
          for every major exam. From doubt-solving to daily plans, your personal guru is always on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,107,53,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF8F5D] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#FF6B35]/20"
          >
            Start Learning Free <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="#demo"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-8 py-4 text-base font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            <Play size={18} className="text-[#FF6B35]" /> Watch Demo
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
            Trusted by toppers from
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 opacity-40">
            {["IIT Bombay", "AIIMS Delhi", "IIM Ahmedabad", "Delhi University", "Anna University"].map(
              (inst) => (
                <span key={inst} className="text-sm font-semibold text-zinc-400">
                  {inst}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>

      <HeroDashboard />
    </section>
  );
}
