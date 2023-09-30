import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';
import { IGenre } from '../../interfaces/IGenre';
import { IMovie } from '../../interfaces/IMovie';
import { ICast } from '../../interfaces/ICast';
const API_KEY = Config.TMDB_API_KEY;



interface MoviesState {
    movies: {
        newMovies: IMovie[],
        upcomingMovies: IMovie[]
    };
    genres: IGenre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    selectedMovie: IMovie & { cast?: ICast[] } | null,
}

const initialState: MoviesState = {
    movies: {
        newMovies: [],
        upcomingMovies: []
    },
    genres: [],
    status: 'idle',
    error: null,
    selectedMovie: null,
};

export const fetchNewMovies = createAsyncThunk('movies/fetchNewMovies', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`);
    return response.data.results;
});
export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results;
});

export const getMovieCast = createAsyncThunk('movies/getMovieCast', async (movieId: number | string) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    console.log("response is: ", response.data.cast)
    return response.data.cast;
})

export const getMoviesGenres = createAsyncThunk('movies/getMoviesGenres', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return response.data.genres;
})

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies.newMovies = action.payload;
            })
            .addCase(fetchNewMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies.upcomingMovies = action.payload;
            })
            .addCase(fetchUpcomingMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getMovieCast.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovieCast.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.selectedMovie) state.selectedMovie.cast = action.payload;
            })
            .addCase(getMovieCast.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getMoviesGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
    },
});

export const { setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
