import type { NextPage } from 'next';
import { useState } from 'react';
import EpisodePicker from '../components/EpisodePicker';
import SearchBar from '../components/SearchBar';

interface TVShow {
  id: number;
  name: string;
}

const Home: NextPage = () => {
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Random Episode Picker</h1>
        <SearchBar onShowSelect={setSelectedShow} />
        {selectedShow && (
          <>
            <h2 className="mt-4 text-2xl">{selectedShow.name}</h2>
            <EpisodePicker tvShowId={selectedShow.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
