import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {LoginPage} from './pages/Login.js';
import {HomePage} from './pages/Home.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
