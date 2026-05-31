import type {
    Achievement,
    ContinueLearningEpisode,
    Episode,
    Show,
    User,
  } from "../types/home";

  export const mockUser: User = {
    id: "u1",
    name: "Arjun",
    streak: 7,
    completedEpisodes: 18,
  };
  
  export const continueLearning: ContinueLearningEpisode = {
    id: "ep101",
    type: "episode",
    title: "The Missing Slice",
    description: "Learn fractions through a pizza adventure.",
    thumbnailUrl: "/hero.png",
    heroImage: "/hero.png",
    showId: "show1",
    showTitle: "Pizza Planet",
    seasonNumber: 1,
    episodeNumber: 3,
    duration: "12 min",
    progressPercentage: 65,
  };
  
  export const todaysLineup: Episode[] = [
    {
      id: "ep102",
      type: "episode",
      title: "Fraction Battle",
      description: "Compare fractions easily.",
      thumbnailUrl: "/hero.png",
      showId: "show1",
      showTitle: "Pizza Planet",
      seasonNumber: 1,
      episodeNumber: 4,
      duration: "10 min",
      progressPercentage: 0,
    },
    {
      id: "ep201",
      type: "episode",
      title: "The Number Maze",
      description: "Navigate the maze of numbers.",
      thumbnailUrl: "/hero.png",
      showId: "show2",
      showTitle: "Number Kingdom",
      seasonNumber: 1,
      episodeNumber: 2,
      duration: "9 min",
      progressPercentage: 0,
    },
  ];
  
  export const recommendedShows: Show[] = [
    {
      id: "show1",
      type: "show",
      title: "Pizza Planet",
      description: "Master fractions and percentages.",
      posterUrl: "/hero.png",
      subject: "Mathematics",
      board: "CBSE",
      className: "Class 5",
    },
    {
      id: "show2",
      type: "show",
      title: "Number Kingdom",
      description: "Learn numbers through stories.",
      posterUrl: "/hero.png",
      subject: "Mathematics",
      board: "CBSE",
      className: "Class 5",
    },
    {
      id: "show3",
      type: "show",
      title: "Geometry Adventures",
      description: "Explore shapes and angles.",
      posterUrl: "/hero.png",
      subject: "Mathematics",
      board: "CBSE",
      className: "Class 5",
    },
  ];
  
  export const subjectShows: Show[] = [
    {
      id: "math",
      type: "show",
      title: "Mathematics",
      description: "Learn Math through adventures.",
      posterUrl: "/hero.png",
      subject: "Mathematics",
      board: "CBSE",
      className: "Class 5",
    },
    {
      id: "science",
      type: "show",
      title: "Science",
      description: "Discover how the world works.",
      posterUrl: "/hero.png",
      subject: "Science",
      board: "CBSE",
      className: "Class 5",
    },
    {
      id: "english",
      type: "show",
      title: "English",
      description: "Stories, grammar and communication.",
      posterUrl: "/hero.png",
      subject: "English",
      board: "CBSE",
      className: "Class 5",
    },
  ];
  
  export const achievements: Achievement[] = [
    {
      id: "a1",
      title: "7 Day Streak",
      description: "Learned for 7 consecutive days",
      icon: "🔥",
      unlocked: true,
    },
    {
      id: "a2",
      title: "Fraction Hero",
      description: "Completed Fraction Journey",
      icon: "🏆",
      unlocked: true,
    },
  ];