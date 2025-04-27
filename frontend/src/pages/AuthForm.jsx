import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function AuthForm (){
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
    }
    else {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Outlet />
  )
}