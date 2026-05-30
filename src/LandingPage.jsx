import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Brain, Camera, Calendar, BarChart3, Languages, Sparkles, 
  ChevronRight, Star, Zap, Target, TrendingUp, BookOpen, 
  MessageCircle, Award, ArrowRight, Play, X, Menu, Moon, Sun,
  CheckCircle2, Users, Clock, Shield, Cpu, Globe, GraduationCap
} from 'lucide-react';

// ─── ANIMATION VARIANTS ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// ─── GLASS CARD COMPONENT ────────────────────────────────────────
const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { y: -4, scale: 1.01 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
    {children}
  </motion.div>
);

// ─── GLOWING BADGE ────────────────────────────────────────────────
const GlowBadge = ({ children, color = "#FF6B35" }) => (
  <span 
    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
    style={{ 
      borderColor: `${color}40`, 
      background: `${color}15`, 
      color: color,
      boxShadow: `0 0 20px ${color}20`
    }}
  >
    <Sparkles size={12} />
    {children}
  </span>
);

// ─── ANIMATED COUNTER ─────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
};

// ─── NAVBAR ────────────────────────────────────────────────────────
const Navbar = ({ dark, setDark, menuOpen, setMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Features", "Demo", "Analytics", "Pricing", "Testimonials"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#0A0A0F]/80 backdrop-blur-2xl border-b border-white/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5D] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#FF6B35]/20">
            <GraduationCap size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Vidya<span className="text-[#FF6B35]">AI</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-zinc-400 hover:text-white transition-colors font-medium relative group"
              whileHover={{ y: -2 }}
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B35] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-semibold hover:bg-[#FF8F5D] transition-colors shadow-lg shadow-[#FF6B35]/20"
          >
            Get Started <ArrowRight size={14} />
          </motion.button>
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a 
                  key={l} 
                  href={`#${l.toLowerCase()}`} 
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 py-2"
                >
                  {l}
                </a>
              ))}
              <button className="mt-2 py-3 rounded-xl bg-[#FF6B35] text-white text-sm font-semibold">
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── HERO DASHBOARD WIDGET ─────────────────────────────────────────
const HeroDashboard = () => {
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
      className="relative w-full max-w-4xl mx-auto mt-12 perspective-1000"
    >
      <div className="relative rounded-2xl border border-white/10 bg-[#0F0F16]/80 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTab === i 
                    ? "text-white" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={activeTab === i ? { background: `${tab.color}30`, color: tab.color } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stats Card */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-[#FF6B35]" />
              <span className="text-xs text-zinc-400 font-medium">Daily Target</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">87%</div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5D]"
              />
            </div>
            <p className="text-xs text-zinc-500 mt-2">26/30 problems solved</p>
          </GlassCard>

          {/* AI Chat Card */}
          <GlassCard className="p-4 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Brain size={14} className="text-[#00C9A7]" />
              <span className="text-xs text-zinc-400 font-medium">AI Tutor — Organic Chemistry</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] text-[#FF6B35] font-bold">S</span>
                </div>
                <div className="bg-white/5 rounded-lg rounded-tl-none px-3 py-2 text-xs text-zinc-300 max-w-[85%]">
                  Explain SN2 reaction mechanism with an example?
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-[#00C9A7]/10 border border-[#00C9A7]/20 rounded-lg rounded-tr-none px-3 py-2 text-xs text-zinc-200 max-w-[85%]">
                  <span className="text-[#00C9A7] font-semibold">SN2</span> is a backside attack where nucleophile attacks 180° opposite to leaving group. Example: CH₃Br + OH⁻ → CH₃OH + Br⁻ (one-step, inversion of config)
                </div>
                <div className="w-6 h-6 rounded-full bg-[#00C9A7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain size={12} className="text-[#00C9A7]" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] text-[#FF6B35] font-bold">S</span>
                </div>
                <div className="bg-white/5 rounded-lg rounded-tl-none px-3 py-2 text-xs text-zinc-300">
                  Why does polar aprotic solvent favor SN2?
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Performance Graph */}
          <GlassCard className="p-4 md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[#845EC2]" />
                <span className="text-xs text-zinc-400 font-medium">Performance Trend</span>
              </div>
              <span className="text-xs text-[#00C9A7] font-semibold">+23% this month</span>
            </div>
            <div className="flex items-end gap-1 h-20">
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
                  className="flex-1 rounded-t-sm"
                  style={{ 
                    background: i === 11 ? '#FF6B35' : 'rgba(255,255,255,0.1)',
                    opacity: i === 11 ? 1 : 0.5
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-zinc-600">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-yellow-500" />
              <span className="text-xs text-zinc-400 font-medium">Quick Actions</span>
            </div>
            <div className="space-y-2">
              {[
                { icon: Camera, label: "Solve Photo", color: "#FF6B35" },
                { icon: BookOpen, label: "Mock Test", color: "#00C9A7" },
                { icon: Calendar, label: "Study Plan", color: "#845EC2" },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-300 transition-colors"
                >
                  <action.icon size={14} style={{ color: action.color }} />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Glow Effect Behind Dashboard */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35]/10 via-[#845EC2]/10 to-[#00C9A7]/10 rounded-3xl blur-3xl -z-10" />
    </motion.div>
  );
};

// ─── HERO SECTION ──────────────────────────────────────────────────
const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF6B35 0%, #845EC2 50%, transparent 70%)" }} 
        />
        <div className="absolute top-40 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-[#00C9A7]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-[#845EC2]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GlowBadge color="#FF6B35">🇮🇳 Built for Bharat's 600M Students</GlowBadge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          <span className="text-white">Study</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8F5D]">smarter.</span>
          <br />
          <span className="text-white">Score</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#00E5C0]">higher.</span>
          <br />
          <span className="text-zinc-500">In your language.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          India's first AI tutor that adapts to <em>your</em> thinking — in 12 regional languages, 
          for every major exam. From doubt-solving to daily plans, your personal guru is always on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,107,53,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF8F5D] text-white font-semibold text-base shadow-xl shadow-[#FF6B35]/20 flex items-center justify-center gap-2"
          >
            Start Learning Free <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl border border-white/10 text-zinc-300 font-semibold text-base flex items-center justify-center gap-2 hover:text-white transition-colors"
          >
            <Play size={18} className="text-[#FF6B35]" /> Watch Demo
          </motion.button>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <p className="text-xs text-zinc-500 font-medium tracking-widest uppercase mb-4">Trusted by toppers from</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 opacity-40">
            {["IIT Bombay", "AIIMS Delhi", "IIM Ahmedabad", "Delhi University", "Anna University"].map((inst) => (
              <span key={inst} className="text-sm font-semibold text-zinc-400">{inst}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <HeroDashboard />
    </section>
  );
};

// ─── STATS SECTION ─────────────────────────────────────────────────
const Stats = () => {
  const stats = [
    { value: 540000, suffix: "+", label: "Students learning monthly", icon: Users, color: "#FF6B35" },
    { value: 98, suffix: "%", label: "Improvement in test scores", icon: TrendingUp, color: "#00C9A7" },
    { value: 14, suffix: "+", label: "Indian languages supported", icon: Globe, color: "#845EC2" },
  ];

  return (
    <section className="py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
            >
              <GlassCard className="p-8 text-center group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="text-5xl font-extrabold mb-2" style={{ color: stat.color }}>
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
};

// ─── INTERACTIVE AI TUTOR DEMO ─────────────────────────────────────
const AITutorDemo = () => {
  const [messages, setMessages] = useState([
    { type: "user", text: "Explain Newton's 3rd law with a real-life example in Hindi?" },
    { type: "ai", text: "न्यूटन का तीसरा नियम: हर क्रिया के बराबर और विपरीत प्रतिक्रिया होती है। जब आप दीवार को धक्का देते हैं, दीवार भी आपको उतना ही धक्का वापस देती है — बस आप नहीं हिलते क्योंकि दीवार ज़्यादा भारी है! 🏗️" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { type: "user", text: inputValue }]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "ai", 
        text: "That's a great question! Let me break this down step-by-step with visual aids and practice problems tailored to your level. 📚✨" 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <GlowBadge color="#00C9A7">Interactive Demo</GlowBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-white">
            Meet Your AI Guru
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Ask anything. Get answers in your language. See concepts come alive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Features List */}
          <motion.div 
            className="lg:col-span-2 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Languages, title: "12 Indian Languages", desc: "Hindi, Tamil, Telugu, Marathi, Bengali & more", color: "#00C9A7" },
              { icon: Camera, title: "Photo Doubt Solver", desc: "Snap any question, get step-by-step solution", color: "#FF6B35" },
              { icon: Cpu, title: "Adaptive Difficulty", desc: "Adjusts explanation based on your level", color: "#845EC2" },
              { icon: MessageCircle, title: "Conversational", desc: "Talk naturally, like chatting with a friend", color: "#FF9671" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${feature.color}20` }}
                >
                  <feature.icon size={20} style={{ color: feature.color }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-0.5">{feature.title}</h4>
                  <p className="text-zinc-500 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <GlassCard className="h-[500px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#00E5C0] flex items-center justify-center">
                  <Brain size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">VidyaAI Tutor</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7] animate-pulse" />
                    <span className="text-[10px] text-zinc-500">Online — Responds in 2s</span>
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#FF6B35]/10 text-[#FF6B35] text-[10px] font-medium">JEE Mode</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.type === "ai" && (
                        <div className="w-7 h-7 rounded-full bg-[#00C9A7]/20 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                          <Brain size={14} className="text-[#00C9A7]" />
                        </div>
                      )}
                      <div 
                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.type === "user" 
                            ? "bg-[#FF6B35] text-white rounded-tr-sm" 
                            : "bg-white/5 text-zinc-300 border border-white/10 rounded-tl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-zinc-500 text-xs ml-9"
                    >
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      AI is thinking...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0">
                    <Camera size={18} />
                  </button>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask anything about Physics, Chemistry, Math..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white flex-shrink-0 hover:bg-[#FF8F5D] transition-colors"
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
};

// ─── BENTO GRID FEATURES ───────────────────────────────────────────
const BentoFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      desc: "Maps your knowledge gaps in real-time and builds a personalized curriculum that evolves with you.",
      color: "#FF6B35",
      size: "large",
      detail: "540K+ learning paths generated"
    },
    {
      icon: Camera,
      title: "Photo Doubt Solver",
      desc: "Snap any question. Get step-by-step explanation in 3 seconds.",
      color: "#00C9A7",
      size: "small"
    },
    {
      icon: BarChart3,
      title: "Exam Intelligence",
      desc: "Trained on 15 years of UPSC, JEE, NEET papers. Predicts what's likely to appear.",
      color: "#845EC2",
      size: "medium"
    },
    {
      icon: Calendar,
      title: "Smart Study Planner",
      desc: "Enter your exam date. Get a day-by-day adaptive plan.",
      color: "#FF9671",
      size: "small"
    },
    {
      icon: Target,
      title: "Mock Test Analytics",
      desc: "Deep insights into every mistake. Know exactly where to improve.",
      color: "#00C9A7",
      size: "medium"
    },
    {
      icon: Award,
      title: "Peer Leaderboards",
      desc: "Compete with lakhs of students. Weekly challenges and merit badges.",
      color: "#FF6B35",
      size: "large",
      detail: "2.3M+ mock tests taken"
    }
  ];

  return (
    <section id="features" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <GlowBadge color="#845EC2">Features</GlowBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-white">
            Everything You Need<br />
            <span className="text-zinc-500">to Ace Any Exam</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${
                feature.size === "large" ? "md:col-span-2 md:row-span-2" : 
                feature.size === "medium" ? "md:col-span-2" : ""
              }`}
            >
              <GlassCard 
                className={`h-full p-6 flex flex-col ${feature.size === "large" ? "justify-between" : ""}`}
                hover={true}
              >
                <div>
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${feature.color}18` }}
                  >
                    <feature.icon size={22} style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                {feature.detail && (
                  <div className="mt-4 pt-4 border-t border-white/5">
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
};

// ─── DASHBOARD ANALYTICS PREVIEW ───────────────────────────────────
const DashboardPreview = () => {
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const subjects = ["Physics", "Chemistry", "Math", "Biology"];

  const subjectData = {
    Physics: { accuracy: 78, weak: ["Rotational Motion", "Electromagnetism"], strong: ["Mechanics", "Optics"] },
    Chemistry: { accuracy: 85, weak: ["Organic Chemistry"], strong: ["Physical Chemistry", "Inorganic"] },
    Math: { accuracy: 72, weak: ["Calculus", "Coordinate Geometry"], strong: ["Algebra", "Statistics"] },
    Biology: { accuracy: 91, weak: ["Genetics"], strong: ["Ecology", "Human Physiology"] },
  };

  const data = subjectData[selectedSubject];

  return (
    <section id="analytics" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <GlowBadge color="#845EC2">Analytics</GlowBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-white">
            Know Exactly Where<br />
            <span className="text-zinc-500">You Stand</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Selector */}
          <GlassCard className="p-6">
            <h3 className="text-white font-semibold mb-4 text-sm">Subject Performance</h3>
            <div className="space-y-2">
              {subjects.map((subj) => (
                <motion.button
                  key={subj}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedSubject(subj)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm transition-all ${
                    selectedSubject === subj 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  <span>{subj}</span>
                  <span className={`font-semibold ${
                    subjectData[subj].accuracy > 80 ? "text-[#00C9A7]" : 
                    subjectData[subj].accuracy > 75 ? "text-[#FF9671]" : "text-[#FF6B35]"
                  }`}>
                    {subjectData[subj].accuracy}%
                  </span>
                </motion.button>
              ))}
            </div>
          </GlassCard>

          {/* Accuracy Ring */}
          <GlassCard className="p-6 flex flex-col items-center justify-center">
            <h3 className="text-white font-semibold mb-6 text-sm">{selectedSubject} Accuracy</h3>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={data.accuracy > 80 ? "#00C9A7" : data.accuracy > 75 ? "#FF9671" : "#FF6B35"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${data.accuracy * 2.64} 264`}
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

          {/* Strengths & Weaknesses */}
          <GlassCard className="p-6">
            <h3 className="text-white font-semibold mb-4 text-sm">Insights</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[#00C9A7] text-xs font-semibold mb-2 flex items-center gap-1.5">
                  <TrendingUp size={12} /> Strong Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.strong.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-medium border border-[#00C9A7]/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-white/5">
                <p className="text-[#FF6B35] text-xs font-semibold mb-2 flex items-center gap-1.5">
                  <Target size={12} /> Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.weak.map(w => (
                    <span key={w} className="px-2.5 py-1 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-medium border border-[#FF6B35]/20">
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
};

// ─── TESTIMONIALS ──────────────────────────────────────────────────
const Testimonials = () => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "NEET 2024 — AIR 312",
      avatar: "A",
      color: "#FF6B35",
      text: "I failed NEET twice. VidyaAI showed me exactly which chapters I was weak in and why. Third attempt — AIR 312. I still can't believe it.",
      rating: 5
    },
    {
      name: "Rohan Mehta",
      role: "IIT Bombay, CSE",
      avatar: "R",
      color: "#00C9A7",
      text: "The step-by-step photo solving feature is insane. I'd click a JEE problem at midnight and get a full explanation in seconds. Cleared with 98.6 percentile.",
      rating: 5
    },
    {
      name: "Priya Nair",
      role: "UPSC CSE 2024 — Selected",
      avatar: "P",
      color: "#845EC2",
      text: "Preparing in Malayalam was something I never thought was possible. VidyaAI let me think and learn in my own language. It changed everything.",
      rating: 5
    },
    {
      name: "Karthik Rajan",
      role: "CAT 2024 — 99.2 percentile",
      avatar: "K",
      color: "#FF9671",
      text: "The exam intelligence predictions were scary accurate. 3 out of 5 DILR sets I saw in CAT were ones VidyaAI had flagged as 'high probability'. Madness.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <GlowBadge color="#FF9671">Testimonials</GlowBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-white">
            Real Students.<br />
            <span className="text-zinc-500">Real Results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
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
};

// ─── PRICING ───────────────────────────────────────────────────────
const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹0",
      per: "forever",
      desc: "For curious learners",
      features: ["5 AI queries/day", "1 subject", "Basic doubt solving", "Community access"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Scholar",
      price: "₹299",
      per: "per month",
      desc: "For serious aspirants",
      features: ["Unlimited AI queries", "All subjects", "Exam Intelligence", "Vernacular tutor", "Study planner", "Mock tests"],
      cta: "Start 7-day Trial",
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Dronacharya",
      price: "₹799",
      per: "per month",
      desc: "For institutes & coaching",
      features: ["Everything in Scholar", "Up to 50 students", "Teacher dashboard", "Progress reports", "Custom curriculum", "Priority support"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <GlowBadge color="#FF6B35">Pricing</GlowBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-white">
            Plans for Every<br />
            <span className="text-zinc-500">Kind of Student</span>
          </h2>
          <p className="text-zinc-400 mt-2">No hidden fees. Cancel anytime. 7-day free trial on Scholar.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={plan.highlight ? "md:scale-105 md:-my-4" : ""}
            >
              <div className={`relative rounded-2xl p-7 flex flex-col gap-5 border transition-all duration-300 h-full ${
                plan.highlight
                  ? "bg-gradient-to-b from-[#FF6B35] to-[#FF8F5D] border-[#FF6B35] text-white shadow-2xl shadow-[#FF6B35]/20"
                  : "bg-white/[0.03] border-white/10 text-white hover:border-white/20"
              }`}>
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                )}
                <div>
                  <p className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-orange-100" : "text-zinc-400"}`}>{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className={`text-sm mb-1.5 ${plan.highlight ? "text-orange-100" : "text-zinc-500"}`}>/{plan.per}</span>
                  </div>
                  <p className={`text-sm mt-1 ${plan.highlight ? "text-orange-100" : "text-zinc-500"}`}>{plan.desc}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                        plan.highlight ? "bg-white/20 text-white" : "bg-white/10 text-zinc-400"
                      }`}>
                        <CheckCircle2 size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? "bg-white text-[#FF6B35] hover:bg-orange-50 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FINAL CTA ─────────────────────────────────────────────────────
const FinalCTA = () => {
  return (
    <section className="py-24 px-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5D] p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-[#FF6B35]/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)"
            }} />
          </div>
          
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Your Guru Awaits. 🙏
            </h2>
            <p className="text-orange-100 mb-8 text-lg max-w-xl mx-auto">
              Join 5,40,000+ students already learning smarter with VidyaAI. 
              Start your journey to the top today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl bg-white text-[#FF6B35] font-bold text-base hover:bg-orange-50 transition-all shadow-xl"
            >
              Start Free Today →
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// ─── FOOTER ────────────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="py-12 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FF8F5D] flex items-center justify-center text-white font-bold text-xs">
                <GraduationCap size={16} />
              </div>
              <span className="font-bold text-lg text-white">
                Vidya<span className="text-[#FF6B35]">AI</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              India's most advanced AI education platform. Personalized learning in 12 languages 
              for JEE, NEET, UPSC, CAT and more.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              {["AI Tutor", "Study Planner", "Mock Tests", "Doubt Solver", "Analytics"].map(item => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Careers", "Blog", "Privacy", "Terms"].map(item => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2025 VidyaAI Technologies Pvt. Ltd. · Made with ❤️ in Mumbai
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map(social => (
              <a key={social} href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── MAIN APP ──────────────────────────────────────────────────────
export default function VidyaAI() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0F] text-white min-h-screen overflow-x-hidden">
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .perspective-1000 { perspective: 1000px; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>

      <Navbar dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Stats />
      <AITutorDemo />
      <BentoFeatures />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
'''

# Save to output file
with open('/mnt/agents/output/App.jsx', 'w') as f:
    f.write(app_code)

print("✅ Complete App.jsx generated successfully!")
print(f"📁 File saved to: /mnt/agents/output/App.jsx")
print(f"📊 File size: {len(app_code):,} characters")
print("\n🎨 Features included:")
print("   • Premium dark UI with glassmorphism")
print("   • Animated hero with interactive AI dashboard")
print("   • Interactive AI tutor chat demo")
print("   • Bento grid features section")
print("   • Live analytics dashboard preview")
print("   • Animated testimonials")
print("   • Premium pricing cards")
print("   • Emotional CTA with gradient")
print("   • Responsive footer")
print("   • Framer Motion animations throughout")
print("   • Lucide React icons")
print("   • Mobile responsive design")