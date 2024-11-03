import axios, { AxiosResponse } from 'axios';

// Base URL for the TMDB API
const TMDB_BASE_URL: string = 'https://api.themoviedb.org/3';


export const fetchSeasons = async (tvShowId: number): Promise<any[]> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${TMDB_BASE_URL}/tv/${tvShowId}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }
      );
      return response.data.seasons; // Returns an array of season objects
    } catch (error: any) {
      console.error('Error fetching seasons:', error);
      return [];
    }
  };

  
export const fetchRandomEpisode = async (tvShowId: number, seasonNumber: number): Promise<any[]> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${TMDB_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }
      );
      return response.data.episodes; // Returns an array of episodes
    } catch (error: any) {
      console.error('Error fetching episodes:', error);
      return [];
    }
  };
  
  // Function to fetch images for a specific episode
export const fetchEpisodeImages = async (tvShowId: number, seasonNumber: number, episodeNumber: number): Promise<string[]> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${TMDB_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }
      );
      // Extract image paths from the response (assuming `stills` array is returned)
      return response.data.stills.map((still: any) => still.file_path).slice(0, 4); // Limit to 4 images
    } catch (error: any) {
      console.error('Error fetching episode images:', error);
      return [];
    }
  };
  
export const searchTVShows = async (query: string): Promise<any[]> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${TMDB_BASE_URL}/search/tv`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: query,
          },
        }
      );
      return response.data.results; // Returns an array of TV show results
    } catch (error: any) {
      console.error('Error searching TV shows:', error);
      return [];
    }
  };
