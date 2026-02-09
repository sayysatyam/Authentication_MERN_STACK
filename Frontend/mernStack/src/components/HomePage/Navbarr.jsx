/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User, Settings, LogOut, Sparkles, LogIn } from "lucide-react";
import { useAuthStore } from "../../AuthStore/Store";

const Navbarr = () => {
  const { logOut, user, isAuth } = useAuthStore();
  const isLoggedIn = isAuth ?? !!user;

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Generate Quiz", path: "/ai-quiz" },
    { label: "Features", path: "/feature" },
    { label: "History", path: "/history" },
  ];

  const handleLogout = () => {
    logOut();
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400 tracking-wider">
              Zorixs
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium nav-glow transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">

            {!isLoggedIn && (
              <a
                href="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-r from-voilet-500 to-purple-600 text-white text-sm font-semibold"
              >
                <LogIn className="w-4 h-4" /> Login
              </a>
            )}

            {/* DESKTOP PROFILE */}
            {isLoggedIn && (
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button>
                  <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden flex items-center justify-center hover:bg-white/20 transition-colors">
                    {user?.profilePic || user?.avatar ? (
                      <img
                        src={user.profilePic || user.avatar}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-200" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 glass border border-white/10"
                    >
                      <a href="/update" className="flex px-4 py-2 text-sm text-gray-300 hover:bg-white/10 gap-2">
                        <User className="w-4 h-4" /> Profile
                      </a>
                      <a className="flex px-4 py-2 text-sm text-gray-300 hover:bg-white/10 gap-2">
                        <Settings className="w-4 h-4" /> Settings
                      </a>
                      <button onClick={handleLogout} className="w-full flex px-4 py-2 text-sm text-red-500 hover:bg-white/10 gap-2">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* MOBILE PROFILE ICON (LEFT OF HAMBURGER) */}
            {isLoggedIn && (
              <div className="md:hidden relative">
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  className="w-10 h-10 rounded-full border border-white/20 overflow-hidden flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {user?.profilePic || user?.avatar ? (
                    <img
                      src={user.profilePic || user.avatar}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-200" />
                  )}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 glass border border-white/10 z-50"
                    >
                      <a href="/update" className="flex px-4 py-2 text-sm text-gray-300 hover:bg-white/10 gap-2">
                        <User className="w-4 h-4" /> Profile
                      </a>
                      <a className="flex px-4 py-2 text-sm text-gray-300 hover:bg-white/10 gap-2">
                        <Settings className="w-4 h-4" /> Settings
                      </a>
                      <button onClick={handleLogout} className="w-full flex px-4 py-2 text-sm text-red-500 hover:bg-white/10 gap-2">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:bg-white/10"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:bg-white/10 px-3 py-2 rounded-md"
                >
                  {item.label}
                </a>
              ))}
             {isLoggedIn&&(
               <button onClick={handleLogout} className="w-full flex px-4 py-2 text-sm text-red-500 hover:bg-white/10 gap-2">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
             )}

              {!isLoggedIn && (
                <a href="/login" className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-md">
                  <LogIn className="w-4 h-4" /> Login
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbarr;