import React, { useState } from 'react';
import { fetchRandomEpisode, fetchSeasons, fetchEpisodeImages } from '../utils/apiHelper';
import { Episode } from '../types/tmdbTypes';

interface EpisodePickerProps {
  tvShowId: number;
}

const EpisodePicker: React.FC<EpisodePickerProps> = ({ tvShowId }) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [seasonNumber, setSeasonNumber] = useState<number | null>(null);
  const [episodeImages, setEpisodeImages] = useState<string[]>([]);

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

          // Fetch images for the selected episode
          const images = await fetchEpisodeImages(tvShowId, randomSeason.season_number, randomEpisode.episode_number);
          setEpisodeImages(images);
        }
      }
    } catch (error) {
      console.error('Error fetching random episode:', error);
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={getRandomEpisode}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
      >
        Get Random Episode
      </button>
      {episode && seasonNumber !== null && (
        <div className="mt-6 p-4 border rounded shadow-lg bg-white">
          <h2 className="text-2xl font-bold text-gray-800">{episode.name}</h2>
          <p className="text-lg font-semibold text-gray-500 mt-2">
            Season {seasonNumber}, Episode {episode.episode_number}
          </p>
          <p className="text-gray-700 mt-3">{episode.overview}</p>
          {episodeImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {episodeImages.map((path, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${path}`}
                  alt={`Still ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No preview images available for this episode.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EpisodePicker;
