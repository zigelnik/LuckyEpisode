import axios, { AxiosResponse } from 'axios';

// Base URL for the TMDB API
const TMDB_BASE_URL: string = 'https://api.themoviedb.org/3';

// TypeScript utility function to fetch episodes of a show
export const fetchRandomEpisode = async (tvShowId: number): Promise<any[]> => {
  try {
    // TypeScript typing for response: AxiosResponse
    const response: AxiosResponse<any> = await axios.get(
      `${TMDB_BASE_URL}/tv/${tvShowId}/season/1`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, // Accessing the API key
        },
      }
    );

    // Ensure response has the expected data structure
    return response.data.episodes; // Returns an array of episodes if the request is successful
  } catch (error: any) {
    // Type checking for error
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
};
