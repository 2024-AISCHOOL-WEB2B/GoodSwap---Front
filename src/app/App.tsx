// src/app/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/LoginForm";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
          />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/main"
            element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
