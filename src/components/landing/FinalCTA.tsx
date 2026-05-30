import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5D] p-12 text-center shadow-2xl shadow-[#FF6B35]/20 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)",
              }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">Your Guru Awaits. 🙏</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-orange-100">
              Join 5,40,000+ students already learning smarter with VidyaAI. Start your journey to the top today.
            </p>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-2xl bg-white px-10 py-4 text-base font-bold text-[#FF6B35] shadow-xl transition-all hover:bg-orange-50"
            >
              Start Free Today →
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
