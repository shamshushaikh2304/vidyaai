import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, GraduationCap, Users, ArrowRight, Sparkles } from "lucide-react";
import { useFlow } from "@/contexts/FlowContext";
import { AppShell } from "@/components/AppShell";

export default function Login() {
  const [, navigate] = useLocation();
  const { role, setRole } = useFlow();
  const [name, setName] = useState("");
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (!name.trim()) return;
    navigate("/boards");
  };

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex flex-col">
        {/* Warm background pattern */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -20%, hsl(25 95% 53% / 0.12) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 100% 80%, hsl(222 47% 11% / 0.05) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, hsl(25 95% 53%) 0px, hsl(25 95% 53%) 1px, transparent 1px, transparent 60px)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 items-center flex-1">
          {/* Left: Hero copy */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-sm font-medium text-primary">AI-powered tutoring for India</span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold text-secondary leading-[1.1] mb-6">
              Learn smarter,<br />
              <span className="text-primary">every subject.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Personalised AI tutoring for CBSE, ICSE &amp; State Boards. Your child gets a patient,
              always-available tutor who speaks their language — literally.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {[["10K+", "Students"], ["4", "Boards"], ["6", "Languages"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold text-secondary">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Login card */}
          <div className="w-full max-w-md">
            <div className="bg-card rounded-3xl border border-border shadow-xl shadow-orange-50 p-8">
              <h2 className="font-display text-2xl font-bold text-secondary mb-1">Get started</h2>
              <p className="text-sm text-muted-foreground mb-6">Free for 7 days · No credit card needed</p>

              {/* Name input */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-secondary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                />
              </div>

              {/* Role selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-secondary mb-3">I am a…</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "student", icon: GraduationCap, label: "Student", sub: "I want to learn" },
                    { id: "parent", icon: Users, label: "Parent", sub: "For my child" },
                  ].map(({ id, icon: Icon, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => setRole(id as "student" | "parent")}
                      onMouseEnter={() => setHoveredRole(id)}
                      onMouseLeave={() => setHoveredRole(null)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                        role === id
                          ? "border-primary bg-orange-50 text-secondary"
                          : "border-border bg-background text-muted-foreground hover:border-orange-200 hover:bg-orange-50/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          role === id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-secondary">{label}</div>
                        <div className="text-xs text-muted-foreground">{sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleContinue}
                disabled={!name.trim()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 ${
                  name.trim()
                    ? "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight size={18} />
              </button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By continuing you agree to our Terms &amp; Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-t border-border bg-card py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {["✅ CBSE, ICSE & State Boards", "🇮🇳 6 Indian languages", "🔒 Safe for kids", "📱 Works on any device"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
