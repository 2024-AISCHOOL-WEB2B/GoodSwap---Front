// 수정된 코드 (Jotai Provider 제거)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MainPage from "./pages/MainPage";

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
