import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";

type Route = {
  path: string;
  element: React.ReactNode;
}

export const publicRoutes: Route[] = [
  {path: "sign-in", element: <SignIn />},
  {path: "sign-up", element: <SignUp />},
]

export const authRoutes = [
  {path: "dashboard", element: <Dashboard />},
]

export default [
  ...publicRoutes,
  ...authRoutes
]