import './index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/layout/Header';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
