// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/views/Navbar';
import Footer from './components/views/Footer';


//device
import AddDevice from './components/views/Device/AddDevice';
import AllDevice from './components/views/Device/AllDevice';


//location
import  AddLocation  from './components/views/Location/AddLocation';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<AllDevice />} />
          <Route path='/deviceAdd' element={<AddDevice />} />
          <Route path='/locationAdd' element={<AddLocation />} />
        </Routes>  
      </Router>
      <Footer />
    </div>
  );
}

export default App;
