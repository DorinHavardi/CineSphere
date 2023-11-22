import { IGenre } from "../interfaces/IGenre";

// GENRES 
export const getGenresNames = (genreIds: number[], genres: IGenre[]) => {
    return genreIds.map((genreId, i) => {
        const genre = genres.find(g => g.id === genreId);
        return genre && i !== genreIds.length - 1 ? `${genre.name}, ` : genre && i === genreIds.length - 1 ? `${genre.name} ` : "Unknown ";
    })
}

// RATING
export const voteAverageToStarRating = (voteAverage: number) => {
    const normalized = voteAverage / 10;
    const scaled = normalized * 4;
    const rounded = Math.round(scaled);
    return rounded + 1;
}
