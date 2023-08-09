import './index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/ui/header/Header';
import AppRouter from './routes/appRouter/AppRouter';

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
