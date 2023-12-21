import Config from "react-native-config";
import axios from "axios";
import { IGenre } from "../interfaces/IGenre";
import { IMovie } from "../interfaces/IMovie";
import { ITVShow } from "../interfaces/ITVShow";

const API_KEY = Config.TMDB_API_KEY;
const BASE_URL = Config.BASE_URL;

// GENRES 
export const getGenresNames = (genreIds: number[], genres: IGenre[]) => {
    if (genreIds) {
        return genreIds.map((genreId, i) => {
            const genre = genres.find(g => g.id === genreId);
            return genre && i !== genreIds.length - 1 ? `${genre.name}, ` : genre && i === genreIds.length - 1 ? `${genre.name} ` : "Unknown ";
        })
    }
}

// RATING
export const voteAverageToStarRating = (voteAverage: number) => {
    const normalized = voteAverage / 10;
    const scaled = normalized * 4;
    const rounded = Math.round(scaled);
    return rounded + 1;
}

// YEAR 
export const getReleaseYear = (date: string) => (date?.split("-")[0]);

// SEARCH 
export type SearchResult = IMovie | ITVShow;

export const searchTMDb = async (query: string): Promise<SearchResult[]> => {
    try {
        const movieResponse = await axios.get(`${BASE_URL}/search/movie`, {
            params: { api_key: API_KEY, query }
        });
        const tvResponse = await axios.get(`${BASE_URL}/search/tv`, {
            params: { api_key: API_KEY, query }
        });

        const movies = movieResponse.data.results as IMovie[];
        const tvShows = tvResponse.data.results as ITVShow[];

        return [...movies, ...tvShows];
    } catch (error) {
        console.error(error);
        return [];
    }
};
