// ─────────────────────────────────────────────────────────────────────────────
// onboardingStore.ts  –  VidyaAI global state (Zustand + persist)
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BoardId } from "../data/curriculum";

export type UserRole = "student" | "parent" | null;

export type OnboardingStep =
  | "login"
  | "board"
  | "class"
  | "subject"
  | "tutor";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  subject?: string;
}

export interface OnboardingState {
  // ── Auth ──────────────────────────────────────────────────────────────────
  userRole: UserRole;
  userName: string;
  userEmail: string;
  isLoggedIn: boolean;

  // ── Selection ─────────────────────────────────────────────────────────────
  selectedBoard: BoardId | null;
  selectedClass: number | null;
  selectedSubjects: string[];    // subject ids
  activeSubjectId: string | null;

  // ── Navigation ────────────────────────────────────────────────────────────
  currentStep: OnboardingStep;

  // ── Chat ──────────────────────────────────────────────────────────────────
  chatHistory: Record<string, ChatMessage[]>;  // keyed by subjectId
  isAiTyping: boolean;

  // ── Actions ───────────────────────────────────────────────────────────────
  setUserRole: (role: UserRole) => void;
  setUserInfo: (name: string, email: string) => void;
  login: (role: UserRole, name: string, email: string) => void;
  logout: () => void;

  setSelectedBoard: (board: BoardId) => void;
  setSelectedClass: (cls: number) => void;
  toggleSubject: (subjectId: string) => void;
  setSelectedSubjects: (subjects: string[]) => void;
  setActiveSubject: (subjectId: string) => void;

  goToStep: (step: OnboardingStep) => void;
  goNext: () => void;
  goBack: () => void;

  addMessage: (subjectId: string, message: Omit<ChatMessage, "id">) => void;
  setAiTyping: (typing: boolean) => void;
  clearChat: (subjectId: string) => void;

  reset: () => void;
}

const STEP_ORDER: OnboardingStep[] = ["login", "board", "class", "subject", "tutor"];

const initialState = {
  userRole: null as UserRole,
  userName: "",
  userEmail: "",
  isLoggedIn: false,
  selectedBoard: null as BoardId | null,
  selectedClass: null as number | null,
  selectedSubjects: [] as string[],
  activeSubjectId: null as string | null,
  currentStep: "login" as OnboardingStep,
  chatHistory: {} as Record<string, ChatMessage[]>,
  isAiTyping: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ── Auth ────────────────────────────────────────────────────────────
      setUserRole: (role) => set({ userRole: role }),

      setUserInfo: (name, email) => set({ userName: name, userEmail: email }),

      login: (role, name, email) =>
        set({
          userRole: role,
          userName: name,
          userEmail: email,
          isLoggedIn: true,
          currentStep: "board",
        }),

      logout: () =>
        set({
          ...initialState,
          currentStep: "login",
        }),

      // ── Selection ────────────────────────────────────────────────────────
      setSelectedBoard: (board) =>
        set({
          selectedBoard: board,
          selectedClass: null,
          selectedSubjects: [],
          activeSubjectId: null,
          currentStep: "class",
        }),

      setSelectedClass: (cls) =>
        set({
          selectedClass: cls,
          selectedSubjects: [],
          activeSubjectId: null,
          currentStep: "subject",
        }),

      toggleSubject: (subjectId) => {
        const { selectedSubjects } = get();
        const isSelected = selectedSubjects.includes(subjectId);
        set({
          selectedSubjects: isSelected
            ? selectedSubjects.filter((s) => s !== subjectId)
            : [...selectedSubjects, subjectId],
        });
      },

      setSelectedSubjects: (subjects) => set({ selectedSubjects: subjects }),

      setActiveSubject: (subjectId) => set({ activeSubjectId: subjectId }),

      // ── Navigation ───────────────────────────────────────────────────────
      goToStep: (step) => set({ currentStep: step }),

      goNext: () => {
        const { currentStep } = get();
        const idx = STEP_ORDER.indexOf(currentStep);
        if (idx < STEP_ORDER.length - 1) {
          set({ currentStep: STEP_ORDER[idx + 1] });
        }
      },

      goBack: () => {
        const { currentStep } = get();
        const idx = STEP_ORDER.indexOf(currentStep);
        if (idx > 0) {
          set({ currentStep: STEP_ORDER[idx - 1] });
        }
      },

      // ── Chat ─────────────────────────────────────────────────────────────
      addMessage: (subjectId, message) => {
        const { chatHistory } = get();
        const existing = chatHistory[subjectId] ?? [];
        set({
          chatHistory: {
            ...chatHistory,
            [subjectId]: [
              ...existing,
              { ...message, id: `${Date.now()}-${Math.random()}` },
            ],
          },
        });
      },

      setAiTyping: (typing) => set({ isAiTyping: typing }),

      clearChat: (subjectId) => {
        const { chatHistory } = get();
        const updated = { ...chatHistory };
        delete updated[subjectId];
        set({ chatHistory: updated });
      },

      // ── Reset ────────────────────────────────────────────────────────────
      reset: () => set({ ...initialState }),
    }),
    {
      name: "aryalearn-onboarding",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userRole:        state.userRole,
        userName:        state.userName,
        userEmail:       state.userEmail,
        isLoggedIn:      state.isLoggedIn,
        selectedBoard:   state.selectedBoard,
        selectedClass:   state.selectedClass,
        selectedSubjects:state.selectedSubjects,
        activeSubjectId: state.activeSubjectId,
        currentStep:     state.currentStep,
        chatHistory:     state.chatHistory,
      }),
    }
  )
);

// ─── Selectors (stable references) ───────────────────────────────────────────
export const selectProgress = (state: OnboardingState): number => {
  const idx = STEP_ORDER.indexOf(state.currentStep);
  return Math.round((idx / (STEP_ORDER.length - 1)) * 100);
};

export const STEP_LABELS: Record<OnboardingStep, string> = {
  login:   "Login",
  board:   "Board",
  class:   "Class",
  subject: "Subjects",
  tutor:   "Tutor",
};

export { STEP_ORDER };
