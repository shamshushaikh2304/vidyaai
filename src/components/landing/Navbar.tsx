import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GraduationCap, Menu, Moon, Sun, X } from "lucide-react";

const NAV_LINKS = ["Features", "Demo", "Analytics", "Pricing", "Testimonials"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6">
        <motion.div className="flex items-center gap-2.5" whileHover={{ scale: 1.02 }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5D] text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20">
            <GraduationCap size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Vidya<span className="text-[#FF6B35]">AI</span>
          </span>
        </motion.div>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="group relative text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              whileHover={{ y: -2 }}
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#FF6B35] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDark(!dark)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden items-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6B35]/20 transition-colors hover:bg-[#FF8F5D] md:flex"
          >
            Get Started <ArrowRight size={14} />
          </motion.a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            className="overflow-hidden border-t border-white/5 bg-[#0A0A0F]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm font-medium text-zinc-300"
                >
                  {l}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl bg-[#FF6B35] py-3 text-center text-sm font-semibold text-white"
              >
                Get Started Free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
