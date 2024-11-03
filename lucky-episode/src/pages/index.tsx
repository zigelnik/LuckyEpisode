import type { NextPage } from 'next';
import EpisodePicker from '../components/EpisodePicker';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Random Episode Picker</h1>
        <EpisodePicker tvShowId={1399} /> {/* Example TV show ID for "Game of Thrones" */}
      </div>
    </div>
  );
};

export default Home;
