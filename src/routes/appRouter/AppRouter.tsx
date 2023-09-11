import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../../pages/login/Login';
import Home from '../../pages/Home/Home';
import Cart from '../../pages/Cart/Cart';
import Registration from '../../pages/Registration';
import NotFound from '../../pages/NotFound';
import Profile from '../../pages/Profile/Profile';

import ROUTES from '../routes';
import AuthContext from '../../core/utils/authContext';
import Categories from '../../pages/Categories/Categories';
import SubCategories from '../../pages/subCategories/SubCategories';
import ProductPage from '../../pages/ProductPage/ProductPage';

function AppRouter() {
  const { isAuth } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={isAuth ? <Navigate to='/' /> : <Login />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.PROFILE} element={isAuth ? <Profile /> : <Navigate to='/login' />} />
        <Route path={ROUTES.CATEGORIES} element={<Categories />} />
        <Route path={ROUTES.SUBCATEGORIES} element={<SubCategories />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
