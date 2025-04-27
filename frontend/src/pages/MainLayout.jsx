import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MainLayout() {
    const navigate = useNavigate();
    
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
      }
      else {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }, []);

  return (
    <div>
      <header>
        <h1>Main Layout</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}