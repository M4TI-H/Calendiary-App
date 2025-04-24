import { Routes, Route } from "react-router-dom";
import { Home } from './pages/main';
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
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}