import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link href="/">Kat Gov</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/proposals" className="text-white">Proposals</Link>
          <Link href="/elections" className="text-white">Elections</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
