import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import CartDrawer from './components/CartDrawer';
import { useState } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <ToastProvider>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Menu />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <CartDrawer />
          <CookieConsent />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
