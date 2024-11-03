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
    <div className="text-center mt-8">
      <button
        onClick={getRandomEpisode}
        className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition duration-300 shadow-lg"
      >
        Get Random Episode
      </button>
      {episode && seasonNumber !== null && (
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{episode.name}</h2>
          <p className="text-lg font-semibold text-indigo-600">
            Season {seasonNumber}, Episode {episode.episode_number}
          </p>
          <p className="text-gray-700 mt-3 mb-4">{episode.overview}</p>
          {episodeImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {episodeImages.map((path, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${path}`}
                  alt={`Still ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
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
