import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Fix: Use BrowserRouter
// import './App.css';
import Layouts from './layouts/Layouts';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useAppContext } from './contexts/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import { Search } from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';

function App() {
  const {isLoggedIn} = useAppContext();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layouts>
            <Home />
          </Layouts>} />
          <Route path="/search" element={<Layouts>
            <Search />
          </Layouts>} />
          <Route path="/detail/:hotelId" element={<Layouts>
            <Detail />
          </Layouts>} />
          <Route path='/register' element={<Layouts>
            <Register />
          </Layouts>}/>
          <Route path='/sign-in' element={<Layouts>
            <SignIn />
          </Layouts>}/>
          {isLoggedIn && (
            <>
            <Route path='/hotel/:hotelId/booking' element={<Layouts><Booking /></Layouts>}/>
            <Route path='/add-hotel' element={<Layouts><AddHotel /></Layouts>}/>
            <Route path='/my-hotels' element={<Layouts><MyHotels /></Layouts>}/>
            <Route path='/my-bookings' element={<Layouts><MyBookings /></Layouts>}/>
            <Route path='/edit-hotel/:hotelId' element={<Layouts><EditHotel /></Layouts>}/>
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
