import { create } from "zustand";

import {
  achievements,
  continueLearning,
  mockUser,
  recommendedShows,
  subjectShows,
  todaysLineup,
} from "../data/mockData";

import type { HomeStoreState } from "../types/home";

export const useHomeStore = create<HomeStoreState>((set) => ({
  loading: false,
  error: null,

  user: null,

  continueLearning: null,
  todaysLineup: [],
  recommended: [],
  subjects: [],
  achievements: [],

  loadHomeData: () => {
    set({
      loading: true,
      error: null,
    });

    setTimeout(() => {
      set({
        loading: false,
        user: mockUser,

        continueLearning,
        todaysLineup,

        recommended: recommendedShows,
        subjects: subjectShows,
        achievements,
      });
    }, 500);
  },
}));