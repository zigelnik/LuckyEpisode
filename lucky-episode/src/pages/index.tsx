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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Random Episode Picker</h1>
        <SearchBar onShowSelect={setSelectedShow} />
        {selectedShow && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">{selectedShow.name}</h2>
            {selectedShow.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedShow.poster_path}`}
                alt={selectedShow.name}
                className="mb-4 w-64 h-96 object-cover rounded"
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
