import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../../pages/Login';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import Registration from '../../pages/Registration';
import NotFound from '../../pages/NotFound';
import Profile from '../../pages/Profile';

import ROUTES from '../routes';

function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
