import React, { useState } from 'react';
import { fetchRandomEpisode } from '../utils/apiHelper';
import { Episode } from '../types/tmdbTypes';

interface EpisodePickerProps {
  tvShowId: number;
}

const EpisodePicker: React.FC<EpisodePickerProps> = ({ tvShowId }) => {
  const [episode, setEpisode] = useState<Episode | null>(null);

  const getRandomEpisode = async () => {
    const episodes = await fetchRandomEpisode(tvShowId);
    if (episodes.length > 0) {
      const randomIndex = Math.floor(Math.random() * episodes.length);
      setEpisode(episodes[randomIndex]);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={getRandomEpisode}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Get Random Episode
      </button>
      {episode && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{episode.name}</h2>
          <p>{episode.overview}</p>
          {episode.still_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
              alt={episode.name}
              className="mt-2"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EpisodePicker;
