import Link from 'next/link';
import { Home, User, Bell, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              Nick&apos;s Social Media
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full">
              <Home className="w-6 h-6" />
            </Link>
            <Link href="/search" className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-6 h-6" />
            </Link>
            <Link href="/notifications" className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
            </Link>
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}