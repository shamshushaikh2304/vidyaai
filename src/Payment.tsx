import { useState } from "react";
import { useLocation } from "wouter";
import { Check, Zap, Star, Shield } from "lucide-react";
import { useFlow } from "@/contexts/FlowContext";
import { AppShell } from "@/components/AppShell";

const PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    period: "7 days",
    color: "border-border",
    badge: null,
    features: [
      "2 subjects unlocked",
      "First 3 chapters per subject",
      "AI tutor (10 messages/day)",
      "Basic progress tracking",
    ],
    cta: "Start free trial",
    icon: Zap,
    iconColor: "text-gray-500",
    iconBg: "bg-gray-100",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "₹299",
    period: "per month",
    color: "border-primary",
    badge: "Most popular",
    features: [
      "All subjects unlocked",
      "Full syllabus access",
      "Unlimited AI tutor",
      "Voice input & text-to-speech",
      "6 regional languages",
      "Progress reports for parents",
    ],
    cta: "Start for ₹299/month",
    icon: Star,
    iconColor: "text-primary",
    iconBg: "bg-orange-100",
  },
  {
    id: "annual",
    name: "Annual",
    price: "₹1,999",
    period: "per year",
    originalPrice: "₹3,588",
    saving: "Save 44%",
    color: "border-secondary",
    badge: "Best value",
    features: [
      "Everything in Monthly",
      "Priority AI responses",
      "Parent dashboard",
      "Downloadable worksheets",
      "Exam preparation mode",
      "Dedicated support",
    ],
    cta: "Start for ₹1,999/year",
    icon: Shield,
    iconColor: "text-secondary",
    iconBg: "bg-blue-50",
  },
];

export default function Payment() {
  const [, navigate] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const { selectedBoardId, selectedClassId } = useFlow();

  const handleProceed = async () => {
    setLoading(true);
    // Razorpay integration point:
    // const res = await fetch("/api/create-order", { method: "POST", body: JSON.stringify({ plan: selectedPlan }) });
    // const order = await res.json();
    // const rzp = new Razorpay({ key: import.meta.env.VITE_RAZORPAY_KEY, ...order });
    // rzp.open();

    // For demo — go straight to dashboard
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-10 flex-1">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {["Board", "Class", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                "bg-primary text-white"
              }`}>
                <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                {step}
              </div>
              {i < 2 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-secondary mb-2">
            Choose your plan
          </h1>
          <p className="text-muted-foreground mb-8">
            All plans include a 7-day money-back guarantee. Cancel anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left p-6 rounded-3xl border-2 transition-all duration-200 bg-card ${
                    isSelected ? `${plan.color} shadow-lg -translate-y-1` : "border-border hover:border-orange-200"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`w-10 h-10 rounded-xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={plan.iconColor} />
                  </div>

                  <div className="font-display font-bold text-xl text-secondary mb-1">{plan.name}</div>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display text-3xl font-bold text-secondary">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/ {plan.period}</span>
                  </div>

                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm line-through text-muted-foreground">{plan.originalPrice}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{plan.saving}</span>
                    </div>
                  )}

                  <div className={`w-full h-px bg-border my-4 ${plan.originalPrice ? "" : "mt-4"}`} />

                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {/* Proceed button */}
          <button
            onClick={handleProceed}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Setting up your account…
              </span>
            ) : (
              PLANS.find((p) => p.id === selectedPlan)?.cta
            )}
          </button>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-muted-foreground">
            {["🔒 Secured by Razorpay", "↩️ 7-day refund", "❌ Cancel anytime", "🛡️ 256-bit SSL"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
