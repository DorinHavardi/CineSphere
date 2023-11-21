import { EMovieStackRoutes } from "../../enums/EMovieStackRoutes";
import { IMovie } from "../../interfaces/IMovie";

export type MoviesStackParamsList = {
    [EMovieStackRoutes.SingleMovie]: { movie: IMovie };
};