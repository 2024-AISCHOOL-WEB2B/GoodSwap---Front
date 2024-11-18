import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

export const Header: React.FC<{ isLoggedIn: boolean, onLogout: () => void }> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴 표시 상태 관리

  const handleProfileClick = () => {
    if (isLoggedIn) {
      // 로그인 상태라면 드롭다운 메뉴를 표시/숨기기
      setShowDropdown((prevState) => !prevState);
    } else {
      // 로그인되지 않았다면 로그인 페이지로 이동
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    onLogout(); // 로그아웃 함수 호출
    setShowDropdown(false); // 로그아웃 후 드롭다운 메뉴 숨기기
  };

  return (
    <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff69b4' }}>Good</span>
        <span style={{
          fontSize: '30px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #ff69b4, #ffcc99)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginLeft: '2px',
          position: 'relative',
          top: '-5px' // S를 위로 올리기 위해 설정
        }}>
          S
        </span>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffcc99' }}>wap</span>
      </div>

      <div>
        {/* 검색창은 크기 조정이 가능하도록 설정 */}
        <input type="text" placeholder="Search..." style={{ width: '300px' }} />
      </div>

      <div style={{ position: 'relative' }}>
        {isLoggedIn ? (
          // 로그인된 상태에서의 프로필 아이콘
          <div>
            <FiUser
             
              size={30}
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            />
            {/* 드롭다운 메뉴 */}
            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '0',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                }}
              >
                <button
                  onClick={handleLogoutClick}
                  style={{
                    padding: '10px 20px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 'bold'
                    
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // 로그인되지 않은 상태에서의 Sign in 버튼
          <button
            onClick={() => navigate('/login')}
            style={{
               fontSize: '20px',fontWeight: 'bold', marginBottom: '20px', color: '#ff69b4'
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};
// export default Header; (Removing default export)
