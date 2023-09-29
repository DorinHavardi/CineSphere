

// GENRES 
export interface IGenre {
    id: number;
    name: string;
}

export const getGenresNames = (genreIds: number[], genres: IGenre[]): string[] | null => {
    return genreIds.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre ? `${genre.name} ` : "Unknown";
    })
}

// RATING
export const voteAverageToStarRating = (voteAverage: number): number => {
    const normalized = voteAverage / 10;
    const scaled = normalized * 4;
    const rounded = Math.round(scaled);
    return rounded + 1;
}
