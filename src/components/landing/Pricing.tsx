import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { GlowBadge } from "./shared";

type Plan = {
  name: string;
  price: string;
  per: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
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
    features: [
      "Unlimited AI queries",
      "All subjects",
      "Exam Intelligence",
      "Vernacular tutor",
      "Study planner",
      "Mock tests",
    ],
    cta: "Start 7-day Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Dronacharya",
    price: "₹799",
    per: "per month",
    desc: "For institutes & coaching",
    features: [
      "Everything in Scholar",
      "Up to 50 students",
      "Teacher dashboard",
      "Progress reports",
      "Custom curriculum",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <GlowBadge color="#FF6B35">Pricing</GlowBadge>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Plans for Every
            <br />
            <span className="text-zinc-500">Kind of Student</span>
          </h2>
          <p className="mt-2 text-zinc-400">No hidden fees. Cancel anytime. 7-day free trial on Scholar.</p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={plan.highlight ? "md:-my-4 md:scale-105" : ""}
            >
              <div
                className={`relative flex h-full flex-col gap-5 rounded-2xl border p-7 transition-all duration-300 ${
                  plan.highlight
                    ? "border-[#FF6B35] bg-gradient-to-b from-[#FF6B35] to-[#FF8F5D] text-white shadow-2xl shadow-[#FF6B35]/20"
                    : "border-white/10 bg-white/[0.03] text-white hover:border-white/20"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    {plan.badge}
                  </span>
                )}
                <div>
                  <p className={`mb-1 text-sm font-semibold ${plan.highlight ? "text-orange-100" : "text-zinc-400"}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className={`mb-1.5 text-sm ${plan.highlight ? "text-orange-100" : "text-zinc-500"}`}>
                      /{plan.per}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm ${plan.highlight ? "text-orange-100" : "text-zinc-500"}`}>
                    {plan.desc}
                  </p>
                </div>
                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs ${
                          plan.highlight ? "bg-white/20 text-white" : "bg-white/10 text-zinc-400"
                        }`}
                      >
                        <CheckCircle2 size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-white text-[#FF6B35] shadow-lg hover:bg-orange-50"
                      : "border border-white/10 bg-white/10 text-white hover:bg-white/20"
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
}
