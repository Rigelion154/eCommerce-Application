import { useState } from 'react';

export default function useAuth() {
  const [auth, setAuth] = useState(false);

  const handleLogout = () => {
    setAuth(false);
  };

  const handleLogin = () => {
    setAuth(true);
  };

  return { auth, handleLogin, handleLogout };
}
