import { Outlet, Navigate } from "react-router-dom"

export default function AuthForm (){
  const isLoggedIn = false;


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

