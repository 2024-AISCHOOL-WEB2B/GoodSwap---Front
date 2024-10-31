// src/app/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { LoginForm } from '../features/auth/components/LoginForm';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../features/atoms/auth';
import PaymentForm from '../features/payment/components/PaymentForm';

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
                    <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
                    <Route path="/payment" element={<PaymentForm />} /> {/* PaymentForm 경로 추가 */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
