import React, { useState } from 'react'; // 1. Import useState
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer'; // 2. Import your CartDrawer

export default function Layout() {
  // 3. Create the state to control the Cart (Open/Closed)
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 4. Pass the 'Open' command to the Navbar */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* 5. Render the CartDrawer here */}
      {/* It sits on top of the layout, controlled by the state */}
      <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}