import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Favorites from '../pages/Favorites';
import ROUTES from './routes';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
