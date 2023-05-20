import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Timeline from './pages/Timeline';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Login} />
          <Route path='/timeline' Component={Timeline}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
