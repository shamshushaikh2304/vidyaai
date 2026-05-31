export type ContentType = "show" | "episode";

export interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  completedEpisodes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Show {
  id: string;
  type: "show";
  title: string;
  description: string;
  posterUrl: string;
  subject: string;
  board: string;
  className: string;
}

export interface Episode {
  id: string;
  type: "episode";
  title: string;
  description: string;
  thumbnailUrl: string;
  showId: string;
  showTitle: string;
  seasonNumber: number;
  episodeNumber: number;
  duration: string;
  progressPercentage: number;
}

export interface ContinueLearningEpisode extends Episode {
  heroImage: string;
}

export interface HomeScreenData {
  continueLearning: ContinueLearningEpisode | null;
  todaysLineup: Episode[];
  recommended: Show[];
  subjects: Show[];
  achievements: Achievement[];
}

export interface HomeStoreState {
  loading: boolean;
  error: string | null;

  user: User | null;

  continueLearning: ContinueLearningEpisode | null;
  todaysLineup: Episode[];
  recommended: Show[];
  subjects: Show[];
  achievements: Achievement[];

  loadHomeData: () => void;
}