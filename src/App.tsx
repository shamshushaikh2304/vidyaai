import { useOnboardingStore } from "./store/onboardingStore";

import LoginPage from "./pages/LoginPage";
import BoardSelectionPage from "./pages/BoardSelectionPage";
import ClassSelectionPage from "./pages/ClassSelectionPage";
import SubjectSelectionPage from "./pages/SubjectSelectionPage";
import TutorPage from "./pages/TutorPage";

export default function App() {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  switch (currentStep) {
    case "login":
      return <LoginPage />;

    case "board":
      return <BoardSelectionPage />;

    case "class":
      return <ClassSelectionPage />;

    case "subject":
      return <SubjectSelectionPage />;

    case "tutor":
      return <TutorPage />;

    default:
      return <LoginPage />;
  }
}