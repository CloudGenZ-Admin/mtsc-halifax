import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { EventsProvider } from './context/EventsContext'; 

// Pages Imports
import Home from './pages/Home';
import About from './pages/About';
import Prayer from './pages/Prayer';
import Awards from './pages/Awards';
import Contact from './pages/Contact';
import WaystoGive from './pages/WaystoGive';

// Event Management System
import AdminLogin from './pages/event/AdminLogin';
import AdminDashboard from './pages/event/AdminDashboard';
import EventForm from './pages/event/EventForm';
import EventList from './pages/event/EventList';
import EventDetail from './pages/event/EventDetail';
import Publication from './pages/Publication'
import Donate from './pages/Donate';
import SeafarerSupport from './pages/SeafarerSupport';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; 
}

function App() {
  return (
    <EventsProvider>
    <Router>
     
      <ScrollToTop /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<About />} />
        <Route path="/prayer" element={<Prayer />} />
        <Route path="/WaysToGive" element={<WaystoGive />} />
        <Route path="/support" element={<SeafarerSupport />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/events" element={<AdminDashboard />} />
        <Route path="/admin/events/new" element={<EventForm />} />
        <Route path="/admin/events/edit/:id" element={<EventForm />} />
        
     
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:url" element={<EventDetail />} />
        <Route path='/publication' element={<Publication />} />
        <Route path='/donate' element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </EventsProvider>
  );
}

export default App;