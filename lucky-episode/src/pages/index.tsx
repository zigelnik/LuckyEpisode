import type { NextPage } from 'next';
import { useState } from 'react';
import EpisodePicker from '../components/EpisodePicker';
import SearchBar from '../components/SearchBar';

interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
}

const Home: NextPage = () => {
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 via-white to-blue-200 py-10">
      <div className="p-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg w-full max-w-2xl">
        {/* Replace headline with logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpeg" // Update this path to match the actual location of your logo
            alt="App Logo"
            className="w-64 h-auto"
          />
        </div>
        <SearchBar onShowSelect={setSelectedShow} />
        {selectedShow && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">{selectedShow.name}</h2>
            {selectedShow.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedShow.poster_path}`}
                alt={selectedShow.name}
                className="mb-4 w-64 h-96 object-cover rounded-lg mx-auto shadow-md"
              />
            )}
            <EpisodePicker tvShowId={selectedShow.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
