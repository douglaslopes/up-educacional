import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Specialties from './pages/Specialties';
import Space from './pages/Space';
import Contact from './pages/Contact';
import Schedule from './pages/Schedule';
import Admin from './pages/Admin';
import { useContent } from './context/ContentContext';

const Layout = () => {
  const { content } = useContent();
  const whatsappLink = `https://wa.me/${content.contact.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <main className="flex-1 md:ml-64 relative">
         {/* Floating WhatsApp Button (visible on all pages except Admin potentially, but kept for simplicity) */}
        <a 
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
            title="Fale conosco no WhatsApp"
        >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
        </a>
        
        <Outlet />
      </main>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        
        {/* Main Layout Routes */}
        <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/especialidades" element={<Specialties />} />
            <Route path="/espaco" element={<Space />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/agendamento" element={<Schedule />} />
            {/* Catch-all redirects to Home */}
            <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;