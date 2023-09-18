import './index.css';
import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-nunito';

import Header from './components/ui/header/Header';
import AppRouter from './routes/appRouter/AppRouter';
import AuthContext from './core/utils/authContext';
import getAnonymousToken from './core/services/getAnonymousToken';
// import getCarts from './core/services/Cart/getCarts';
// import deleteCart from "./core/services/testCart/deleteCart";
// import getCarts from './core/services/Cart/getCarts';
import Footer from './components/ui/footer/Footer';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const authContextValue = useMemo(() => {
    return { isAuth, setIsAuth };
  }, [isAuth, setIsAuth]);

  useEffect(() => {
    // getCarts()
    //   .then(() => {
    //     //   res.forEach((data) => {
    //     //     deleteCart(data.id, data.version)
    //     //       .then(() => {})
    //     //       .catch(() => {});
    //     //   });
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
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
