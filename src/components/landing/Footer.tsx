import { GraduationCap } from "lucide-react";

const PRODUCT_LINKS = ["AI Tutor", "Study Planner", "Mock Tests", "Doubt Solver", "Analytics"];
const COMPANY_LINKS = ["About", "Careers", "Blog", "Privacy", "Terms"];
const SOCIAL_LINKS = ["Twitter", "LinkedIn", "Instagram"];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FF8F5D] text-xs font-bold text-white">
                <GraduationCap size={16} />
              </div>
              <span className="text-lg font-bold text-white">
                Vidya<span className="text-[#FF6B35]">AI</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              India&apos;s most advanced AI education platform. Personalized learning in 12 languages for
              JEE, NEET, UPSC, CAT and more.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} VidyaAI Technologies Pvt. Ltd. · Made with ❤️ in Mumbai
          </p>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a key={social} href="#" className="text-xs text-zinc-600 transition-colors hover:text-zinc-400">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
