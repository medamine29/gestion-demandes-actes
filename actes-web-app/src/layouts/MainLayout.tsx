// components imports
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";

// React Related Imports
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { logout, useTypedDispatch, useTypedSelector } from "../store/index.ts";
import Button from "../components/common/Button.tsx";

const ScrollToTop: React.FC<{}> = () => {

  // hooks
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC<{}> = () => {

  const dispatch = useTypedDispatch()
  const token = useTypedSelector(state => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
  }

  // renders
  return (
    <div className="bg-gray-200/50 w-screen flex flex-col items-center">
      <Header />
      <ScrollToTop />
      { token && (
          <Button
            className="self-end p-2 m-2 rounded border-green-900 text-green-900"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        ) 
      }
      <div className="w-11/12 mt-2 min-h-screen flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
