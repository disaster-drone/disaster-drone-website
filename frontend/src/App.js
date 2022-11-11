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
          <Route path="Homepage" element={<Homepage />} />
          <Route path="AboutPage" element={<AboutPage/>} />
          <Route path="FileClaimsPage" element={<FileClaimsPage/>} />
          <Route path="ClosedClaimsPage" element={<ClosedClaimsPage/>}/>
      </Route> 
    </Routes>
  );
}

export default App;
