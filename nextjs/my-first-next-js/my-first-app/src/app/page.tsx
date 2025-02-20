import Navbar from './components/NavBar';
import MainFeed from './components/MainFeed';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <MainFeed />
      </div>
    </main>
  );
}