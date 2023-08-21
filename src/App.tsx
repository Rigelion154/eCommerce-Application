import './index.css';
import React, { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/ui/header/Header';
import AppRouter from './routes/appRouter/AppRouter';
import AuthContext from './core/utils/authContext';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const authContextValue = useMemo(() => {
    return { isAuth, setIsAuth };
  }, [isAuth, setIsAuth]);

  return (
    <div className='App'>
      <AuthContext.Provider value={authContextValue}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
