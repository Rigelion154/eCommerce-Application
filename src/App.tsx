import './index.css';
import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-nunito';

import Header from './components/ui/header/Header';
import AppRouter from './routes/appRouter/AppRouter';
import AuthContext from './core/utils/authContext';
import getAnonymousToken from './core/services/getAnonymousToken';
import getCarts from './core/services/Cart/getCarts';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const authContextValue = useMemo(() => {
    return { isAuth, setIsAuth };
  }, [isAuth, setIsAuth]);

  useEffect(() => {
    getCarts()
      .then(() => {
        // // @ts-ignore
        // res.forEach((data) => {
        //   deleteCart(data.id, data.version);
        // });
      })
      .catch(() => {});

    // getTokenDelete()
    //   .then((res) => {
    //     if (!localStorage.getItem('delete')) localStorage.setItem('delete', res.accessToken);
    //     if (!localStorage.getItem('delete1')) localStorage.setItem('delete1', res.refreshToken);
    //   })
    //   .catch(() => {});

    getAnonymousToken()
      .then((res) => {
        if (!localStorage.getItem('accessToken'))
          localStorage.setItem('accessToken', res.accessToken);
        if (!localStorage.getItem('refreshToken'))
          localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch(() => {});
  }, []);

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
