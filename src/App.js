import './App.css';
import Inbox from './components/Inbox/Inbox';
import {  Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [split, setSplit] = useState(true)
  return(
    <div className='App'>
      {/* <BrowserRouter> */}
        <Routes>
          <Route exact path="/" element={<Inbox />} />
          <Route exact path="/:id" element={<Inbox split={split} setSplit={setSplit}/>} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  )
}

export default App;
