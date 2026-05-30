import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useFlow } from "@/contexts/FlowContext";
import { AppShell } from "@/components/AppShell";

const BOARDS = [
  {
    id: "cbse",
    name: "CBSE",
    full: "Central Board of Secondary Education",
    emoji: "🇮🇳",
    color: "from-blue-50 to-blue-100/50",
    accent: "border-blue-300",
    tag: "Most popular",
    subjects: "Maths, Science, English, Hindi, Social Science",
  },
  {
    id: "icse",
    name: "ICSE",
    full: "Indian Certificate of Secondary Education",
    emoji: "🎓",
    color: "from-violet-50 to-violet-100/50",
    accent: "border-violet-300",
    tag: "Rigorous curriculum",
    subjects: "English, Maths, Physics, Chemistry, Biology",
  },
  {
    id: "maharashtra",
    name: "Maharashtra Board",
    full: "Maharashtra State Board",
    emoji: "🏛️",
    color: "from-orange-50 to-orange-100/50",
    accent: "border-orange-300",
    tag: "Marathi medium available",
    subjects: "All state board subjects in Marathi & English",
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu Board",
    full: "Tamil Nadu State Board",
    emoji: "🌺",
    color: "from-emerald-50 to-emerald-100/50",
    accent: "border-emerald-300",
    tag: "Tamil medium available",
    subjects: "All state board subjects in Tamil & English",
  },
  {
    id: "karnataka",
    name: "Karnataka Board",
    full: "Karnataka Secondary Education",
    emoji: "🌻",
    color: "from-yellow-50 to-yellow-100/50",
    accent: "border-yellow-300",
    tag: "Kannada medium available",
    subjects: "All state board subjects in Kannada & English",
  },
  {
    id: "telangana",
    name: "Telangana Board",
    full: "Telangana State Board",
    emoji: "🌴",
    color: "from-teal-50 to-teal-100/50",
    accent: "border-teal-300",
    tag: "Telugu medium available",
    subjects: "All state board subjects in Telugu & English",
  },
];

export default function BoardSelection() {
  const [, navigate] = useLocation();
  const { selectedBoardId, setSelectedBoardId, setBoards } = useFlow();

  const handleSelect = (id: string) => {
    setSelectedBoardId(id);
  };

  const handleContinue = () => {
    if (!selectedBoardId) return;
    setBoards(BOARDS);
    navigate("/classes");
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-10 flex-1">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {["Board", "Class", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
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
            Choose your curriculum board
          </h1>
          <p className="text-muted-foreground mb-8">
            We'll load the exact syllabus and chapters for your board.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {BOARDS.map((board) => {
              const isSelected = selectedBoardId === board.id;
              return (
                <button
                  key={board.id}
                  onClick={() => handleSelect(board.id)}
                  className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 bg-gradient-to-br ${board.color} ${
                    isSelected
                      ? `${board.accent} shadow-md -translate-y-0.5`
                      : "border-border hover:border-orange-200 hover:-translate-y-0.5"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2
                      size={20}
                      className="absolute top-4 right-4 text-primary"
                    />
                  )}
                  <div className="text-2xl mb-3">{board.emoji}</div>
                  <div className="font-display font-bold text-lg text-secondary mb-0.5">
                    {board.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{board.full}</div>
                  <div className="inline-block text-xs font-medium bg-white/70 px-2 py-0.5 rounded-full text-secondary/70 mb-3">
                    {board.tag}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {board.subjects}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedBoardId}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 ${
              selectedBoardId
                ? "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-200 hover:-translate-y-0.5"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Continue to Class Selection
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
