import { useTheme } from "@/contexts/ThemeContext";
import ArchivedPage from "@/pages/ArchivedPage";
import CreatePage from "@/pages/CreatePage";
import DetailPage from "@/pages/DetailPage";
import LoginPage from "@/pages/LoginPage";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import RegisterPage from "@/pages/RegisterPage";
import { getUserLogged, putAccessToken } from "@/utils/network-data";
import Navigation from "@/components/navigation/Navigation";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { PowerIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "@/components/alert-dialog/ConfirmationDialog";

const NoteApp = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
    setDialogOpen(false);
    navigate("/login");
  };

  if (initializing) return null;

  return (
    <div className={`min-h-screen ${theme}`}>
      <header className="sticky top-0 z-10 backdrop-blur-lg border-b">
        <div className="max-w-[1024px] mx-auto flex justify-between items-center px-4 sm:px-4 py-3">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">
              MemoFlow
            </Link>
            {authedUser && <Navigation />}
          </div>

          <div className="flex items-center space-x-2">
            <div
              onClick={toggleTheme}
              className="cursor-pointer flex items-center justify-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </div>

            {authedUser && (
              <div
                className="flex items-center justify-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setDialogOpen(true)} // Open dialog on click
              >
                <PowerIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage loginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              authedUser ? (
                <HomePage />
              ) : (
                <LoginPage loginSuccess={onLoginSuccess} />
              )
            }
          />
          <Route
            path="/create"
            element={
              authedUser ? (
                <CreatePage />
              ) : (
                <LoginPage loginSuccess={onLoginSuccess} />
              )
            }
          />
          <Route path="/notes/:noteId" element={<DetailPage />} />
          <Route
            path="/archived"
            element={
              authedUser ? (
                <ArchivedPage />
              ) : (
                <LoginPage loginSuccess={onLoginSuccess} />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={onLogout}
        title="Logout"
        description="Are you sure you want to log out? You will need to log in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </div>
  );
};

export default NoteApp;
