import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Camera,
  Cpu,
  Languages,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassCard, GlowBadge, fadeUp, staggerContainer } from "./shared";

type DemoMessage = { type: "user" | "ai"; text: string };

type SideFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
};

const SIDE_FEATURES: SideFeature[] = [
  {
    icon: Languages,
    title: "12 Indian Languages",
    desc: "Hindi, Tamil, Telugu, Marathi, Bengali & more",
    color: "#00C9A7",
  },
  {
    icon: Camera,
    title: "Photo Doubt Solver",
    desc: "Snap any question, get step-by-step solution",
    color: "#FF6B35",
  },
  {
    icon: Cpu,
    title: "Adaptive Difficulty",
    desc: "Adjusts explanation based on your level",
    color: "#845EC2",
  },
  {
    icon: MessageCircle,
    title: "Conversational",
    desc: "Talk naturally, like chatting with a friend",
    color: "#FF9671",
  },
];

export default function AITutorDemo() {
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      type: "user",
      text: "Explain Newton's 3rd law with a real-life example in Hindi?",
    },
    {
      type: "ai",
      text: "न्यूटन का तीसरा नियम: हर क्रिया के बराबर और विपरीत प्रतिक्रिया होती है। जब आप दीवार को धक्का देते हैं, दीवार भी आपको उतना ही धक्का वापस देती है — बस आप नहीं हिलते क्योंकि दीवार ज़्यादा भारी है! 🏗️",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
    setInputValue("");
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "That's a great question! Let me break this down step-by-step with visual aids and practice problems tailored to your level. 📚✨",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="demo" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <GlowBadge color="#00C9A7">Interactive Demo</GlowBadge>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Meet Your AI Guru
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Ask anything. Get answers in your language. See concepts come alive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
          <motion.div
            className="space-y-4 lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SIDE_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ x: 8 }}
                className="group flex cursor-pointer items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                  style={{ background: `${feature.color}20` }}
                >
                  <feature.icon size={20} style={{ color: feature.color }} />
                </div>
                <div>
                  <h4 className="mb-0.5 text-sm font-semibold text-white">{feature.title}</h4>
                  <p className="text-xs text-zinc-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <GlassCard className="flex h-[500px] flex-col" hover={false}>
              <div className="flex items-center gap-3 border-b border-white/5 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#00C9A7] to-[#00E5C0]">
                  <Brain size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">VidyaAI Tutor</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00C9A7]" />
                    <span className="text-[10px] text-zinc-500">Online — Responds in 2s</span>
                  </div>
                </div>
                <span className="ml-auto rounded-md bg-[#FF6B35]/10 px-2 py-0.5 text-[10px] font-medium text-[#FF6B35]">
                  JEE Mode
                </span>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`${msg.type}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.type === "ai" && (
                        <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00C9A7]/20">
                          <Brain size={14} className="text-[#00C9A7]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.type === "user"
                            ? "rounded-tr-sm bg-[#FF6B35] text-white"
                            : "rounded-tl-sm border border-white/10 bg-white/5 text-zinc-300"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <div className="ml-9 flex items-center gap-2 text-xs text-zinc-500">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                    AI is thinking...
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 p-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Camera size={18} />
                  </button>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask anything about Physics, Chemistry, Math..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-zinc-500 transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] text-white transition-colors hover:bg-[#FF8F5D]"
                  >
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
