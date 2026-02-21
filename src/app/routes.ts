import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import SideEffectsScreen from "./screens/SideEffectsScreen";
import CentersScreen from "./screens/CentersScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import MissedScreen from "./screens/MissedScreen";
import ArticlesScreen from "./screens/ArticlesScreen";
import PainlessScreen from "./screens/PainlessScreen";
import ProfileScreen from "./screens/ProfileScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/onboarding",
    Component: OnboardingScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/schedule",
    Component: ScheduleScreen,
  },
  {
    path: "/side-effects",
    Component: SideEffectsScreen,
  },
  {
    path: "/centers",
    Component: CentersScreen,
  },
  {
    path: "/notifications",
    Component: NotificationsScreen,
  },
  {
    path: "/missed",
    Component: MissedScreen,
  },
  {
    path: "/articles",
    Component: ArticlesScreen,
  },
  {
    path: "/painless",
    Component: PainlessScreen,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
]);
