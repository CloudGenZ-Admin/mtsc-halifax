import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Prayer from './pages/Prayer';
import Awards from './pages/Awards';
import Sponsors from './pages/Sponsors';

// Event Management System
import AdminLogin from './pages/event/AdminLogin';
import AdminDashboard from './pages/event/AdminDashboard';
import EventForm from './pages/event/EventForm';
import EventList from './pages/event/EventList';
import EventDetail from './pages/event/EventDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/prayer" element={<Prayer />} />
        <Route path="/awards" element={<Awards />} /> {/* <-- 2. Add route */}
        <Route path="/sponsors" element={<Sponsors />} />
        
        {/* Event Management Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/events" element={<AdminDashboard />} />
        <Route path="/admin/events/new" element={<EventForm />} />
        <Route path="/admin/events/edit/:id" element={<EventForm />} />
        
        {/* Public Event Routes */}
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:url" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}

export default App;