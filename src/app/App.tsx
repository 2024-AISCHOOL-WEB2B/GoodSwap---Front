// src/app/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage"; // named export에 맞게 수정
import { LoginForm } from "../features/auth/LoginForm"; // named export에 맞게 수정

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
