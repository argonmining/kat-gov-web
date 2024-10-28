import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="bg-primary p-4">
    <div className="container mx-auto flex justify-between">
      <div className="text-dark font-bold">Kat Gov</div>
      <div className="flex space-x-4">
        <Link to="/" className="text-dark">Home</Link>
        <Link to="/proposals" className="text-dark">Proposals</Link>
        <Link to="/elections" className="text-dark">Elections</Link>
        <Link to="/treasury" className="text-dark">Treasury</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
