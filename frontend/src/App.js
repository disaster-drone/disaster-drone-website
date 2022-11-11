import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import FileClaimsPage from './pages/FileClaimsPage';
import ClosedClaimsPage from './pages/ClosedClaimsPage';


function App() {
  return (
    <Routes>
      <Route path='/*' element={<Homepage />}>
      </Route> 
    </Routes>
  );
}

export default App;
