import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import HomePage from './landing_page/home/HomePage';
import Login from './landing_page/login/Login';
import Signup from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import ProductsPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

import { AuthProvider } from './landing_page/context/authContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <>
  //   <Navbar/>
  //     <HomePage />
  //     <Footer/>
  //     </>
  // </StrictMode>

  <>
<AuthProvider>
  <BrowserRouter>

    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/pricing" element={<PricingPage/>} />
      <Route path="/support" element={<SupportPage/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>

  </BrowserRouter>
</AuthProvider>
</>
)


