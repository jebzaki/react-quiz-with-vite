import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './pages/home';
import Results from './pages/results';
import Questions from './pages/questions';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter basename={'/react-quiz-with-vite/'}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/questions" element={<Questions />}></Route>
            <Route path="/results" element={<Results />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
