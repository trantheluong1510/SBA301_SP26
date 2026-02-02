import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import ListOfOrchids from './components/ListOfOrchids';
import EditOrchid from './components/EditOrchid';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="edit/:id" element={<EditOrchid />} />
      </Routes>
    </>
  );
}

export default App;
