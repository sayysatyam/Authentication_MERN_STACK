import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/HomePage";
import Login from "./components/LogIn";
import ForgotPassword from "./components/forgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import AfterForgotPass from "./components/AfterforgotPass";

import { useAuthStore } from "./AuthStore/Store";
import LoadingSpinner from "./component/LoaderSpiner";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const VerifyEmailRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const App = () => {
    const location = useLocation();
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (location.pathname.startsWith("/reset-password")) {
      return;
    }
    checkAuth();
  }, [checkAuth,location.pathname]);

 if (
  isCheckingAuth &&
  !location.pathname.startsWith("/reset-password")
) {
  return <LoadingSpinner />;
}
// from-gray-950 via-purple-950 to-gray-900
  return (
    <div className=" min-h-screen 
  flex 
  items-center 
  justify-center 
  px-6 
  py-6
  bg-linear-to-r 
  from-gray-950 
  via-purple-950 
  to-gray-900">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/verify-email"
          element={
            <VerifyEmailRoute>
              <VerifyEmail />
            </VerifyEmailRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/after-forgotpass"
          element={
            <RedirectAuthenticatedUser>
              <AfterForgotPass />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword/>}
        />

       <Route path="*" element={<div>404</div>} />

      </Routes>
    </div>
  );
};

export default App;
