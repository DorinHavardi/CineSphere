import { IGenre } from "./IGenre";

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        backdrop_path: string;
        id: string;
        name: string;
        poster_path: string;
    };
    budget: number | string,
    genre_ids: number[];
    genres: IGenre[];
    homepage: string;
    imdb_id: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number
}
