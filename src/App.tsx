import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import Index from './pages/Index/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/index' element={<Index />}/>
      </Routes>
    </Router>
  );
}

export default App;
