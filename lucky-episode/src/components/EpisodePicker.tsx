import React, { useState } from 'react';
import { fetchRandomEpisode, fetchSeasons } from '../utils/apiHelper';
import { Episode } from '../types/tmdbTypes';

interface EpisodePickerProps {
  tvShowId: number;
}

const EpisodePicker: React.FC<EpisodePickerProps> = ({ tvShowId }) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [seasonNumber, setSeasonNumber] = useState<number | null>(null);

  const getRandomEpisode = async () => {
    try {
      const seasons = await fetchSeasons(tvShowId);
      if (seasons.length > 0) {
        const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
        setSeasonNumber(randomSeason.season_number);

        const episodes = await fetchRandomEpisode(tvShowId, randomSeason.season_number);
        if (episodes.length > 0) {
          const randomEpisode = episodes[Math.floor(Math.random() * episodes.length)];
          setEpisode(randomEpisode);
        }
      }
    } catch (error) {
      console.error('Error fetching random episode:', error);
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
      {episode && seasonNumber !== null && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{episode.name}</h2>
          <p className="text-gray-600">
            Season {seasonNumber}, Episode {episode.episode_number}
          </p>
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
