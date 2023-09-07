import Dashboard from "./components/admin/Dashboard";
import AdminBooks from "./components/admin/books/Books";
import CreateBook from "./components/admin/books/CreateBook";
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

export const adminRoutes = [
  {path: "dashboard", element: <Dashboard />},
  {path: "books", element: <AdminBooks />},
  {path: "books/new", element: <CreateBook />},
]

export default [
  ...publicRoutes,
  ...adminRoutes
]