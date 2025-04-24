import { useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthForm (){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
        {isLoggedIn ? (
          <Navigate to="/" />
        ) : (
          <>
            <Outlet />
          </>
        )}
    </>
  )
}

