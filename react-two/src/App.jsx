import { useState } from 'react'

import './App.css'
import Card from './components/Card';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import View from './components/View'
import Update from './components/Update';
function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Card/>} />
      <Route path='/users/view/:id' element={<View/>} />
      <Route path='/users/update/:id' element={<Update/>} />
      </Routes>
    </Router>
  )
}

export default App
