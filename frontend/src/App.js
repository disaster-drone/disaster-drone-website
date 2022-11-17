import { Routes, Route } from 'react-router-dom';


import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import FileClaimsPage from './pages/FileClaimsPage';
import ClosedClaimsPage from './pages/ClosedClaimsPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';



function App() {
  return (
      <Routes>
        <Route path='/' element={<Homepage />} />
          <Route index element={<Homepage />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="AboutPage" element={<AboutPage />} />
          <Route path="FileClaimsPage" element={<FileClaimsPage />} />
          <Route path="ClosedClaimsPage" element={<ClosedClaimsPage />} />
          <Route path="LoginPage" element={<LoginPage />} />
      </Routes>
  );
}

export default App;
