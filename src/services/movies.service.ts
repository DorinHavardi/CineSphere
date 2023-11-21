import axios from "axios";
import Config from "react-native-config";
import { ETMDBCategories } from "../enums/ETMDBCategories";
const API_KEY = Config.TMDB_API_KEY;

export const fetchMovies = async (category: ETMDBCategories, page: number) => {
    const response = await axios
        .get(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`);
    return response.data.results;
}