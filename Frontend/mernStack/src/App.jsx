import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/LogIn";
import ForgotPassword from "./components/forgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import AfterForgotPass from "./components/AfterforgotPass";

import { useAuthStore } from "./AuthStore/Store";
import LoadingSpinner from "./component/LoaderSpiner";
import Quiz from "./quiz_AI/quiz";
import MCQ from "./quiz_AI/MCQ";
import LandingPage from "./components/HomePage/Landing";
import SignUp from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import Navbarr from "./components/HomePage/Navbarr";
import Feature from "./quiz_AI/Feature";
import QuizReview from "./quiz_AI/QuizHistory";
import History from "./quiz_AI/History";
import UpdateProfile from "./components/UpdateProfile";


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
  }, [checkAuth, location.pathname]);

  if (isCheckingAuth && !location.pathname.startsWith("/reset-password")) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#020617",
            color: "#e5e7eb",
            border: "1px solid #7c3aed",
          },
        }}
      />

      <div
        className="min-h-screen flex items-center justify-center px-6 py-20
        bg-linear-to-r from-gray-950 via-purple-950 to-gray-900"
      >
        <Navbarr />
        <Routes>
          <Route
            path="/"
            element={
              
                <LandingPage />
              
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
                <SignUp />
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

          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/ai-quiz"
            element={
              <ProtectedRoutes>
                <Quiz />
              </ProtectedRoutes>
            }
          />
          <Route path="/mcq" element={<MCQ />} />
          <Route path="/feature" element={<ProtectedRoutes><Feature/></ProtectedRoutes>}/>
         <Route path="/quiz-review/:quizId" element={<ProtectedRoutes><QuizReview /></ProtectedRoutes>} />
         <Route path="/history" element={<ProtectedRoutes><History/></ProtectedRoutes>}/>
         <Route path="update" element={<ProtectedRoutes><UpdateProfile/></ProtectedRoutes>}/>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
