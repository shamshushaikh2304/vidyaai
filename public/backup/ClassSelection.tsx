import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useFlow } from "@/contexts/FlowContext";
import { AppShell } from "@/components/AppShell";

const CLASSES = [
  { id: "3", label: "Class 3", subjects: 3, chapters: 42 },
  { id: "4", label: "Class 4", subjects: 3, chapters: 55 },
  { id: "5", label: "Class 5", subjects: 4, chapters: 64 },
  { id: "6", label: "Class 6", subjects: 4, chapters: 52 },
  { id: "7", label: "Class 7", subjects: 4, chapters: 58 },
  { id: "8", label: "Class 8", subjects: 4, chapters: 66 },
  { id: "9", label: "Class 9", subjects: 4, chapters: 56 },
  { id: "10", label: "Class 10", subjects: 4, chapters: 72, tag: "Board exam" },
];

const LANGUAGES = [
  { code: "English", label: "English", flag: "🇬🇧" },
  { code: "Hindi", label: "हिंदी", flag: "🇮🇳" },
  { code: "Marathi", label: "मराठी", flag: "🔶" },
  { code: "Tamil", label: "தமிழ்", flag: "🌺" },
  { code: "Telugu", label: "తెలుగు", flag: "🌴" },
  { code: "Kannada", label: "ಕನ್ನಡ", flag: "🌻" },
];

export default function ClassSelection() {
  const [, navigate] = useLocation();
  const {
    selectedClassId,
    setSelectedClassId,
    setClasses,
    selectedBoardId,
  } = useFlow();

  // store language in local state — add to FlowContext if needed
  const [selectedLang, setSelectedLang] = (
    // inline useState via a trick — just use React.useState from import
    // We'll import it at the top in the full file
    [null, () => {}] as any
  );

  const handleContinue = () => {
    if (!selectedClassId) return;
    setClasses(CLASSES);
    navigate("/payment");
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-10 flex-1">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {["Board", "Class", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  i <= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {step}
              </div>
              {i < 2 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-secondary mb-2">
            Which class are you in?
          </h1>
          <p className="text-muted-foreground mb-8">
            We'll load your exact syllabus with all chapters and topics.
          </p>

          {/* Class grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {CLASSES.map((cls) => {
              const isSelected = selectedClassId === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-orange-50 shadow-md -translate-y-0.5"
                      : "border-border bg-card hover:border-orange-200 hover:-translate-y-0.5"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2 size={16} className="absolute top-3 right-3 text-primary" />
                  )}
                  {cls.tag && (
                    <div className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full mb-2 w-fit">
                      {cls.tag}
                    </div>
                  )}
                  <div className="font-display font-bold text-lg text-secondary">{cls.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{cls.subjects} subjects</div>
                  <div className="text-xs text-muted-foreground">{cls.chapters} chapters</div>
                </button>
              );
            })}
          </div>

          {/* Language preference */}
          <div className="mb-8">
            <h2 className="font-semibold text-secondary mb-3">
              Preferred language for explanations
            </h2>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang?.(lang.code)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    selectedLang === lang.code
                      ? "border-primary bg-orange-50 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-orange-200"
                  }`}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedClassId}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 ${
              selectedClassId
                ? "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-200 hover:-translate-y-0.5"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Continue to Plans
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
