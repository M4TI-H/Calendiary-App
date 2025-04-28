import { Routes, Route } from "react-router-dom";
import { Dashboard, Notes, Calendar, Todo, Wellness } from './pages/main';
import LoginForm from "./pages/forms/LoginForm";
import SignupForm from "./pages/forms/SignupForm";
import AuthForm from "./pages/AuthForm"
import MainLayout from "./pages/MainLayout"
 
export default function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route element={<AuthForm />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>
      {/* private */}
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/wellness" element={<Wellness />} />
      </Route>
    </Routes>
  );
}