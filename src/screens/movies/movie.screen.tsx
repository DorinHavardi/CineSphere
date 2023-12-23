import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '../../theme/colors';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { getReleaseYear, voteAverageToStarRating } from '../../utils/TMDB.util';
import { ECSTextTypes } from '../../enums/ECSTextTypes';
import { setIsTabBarVisible } from '../../store/reducers/system.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMovieCast } from '../../store/thunks/movies.thunk';
import { CsCastList, CsText } from '../../components';
import { IGenre } from '../../interfaces/IGenre';
import { setSelectedMovie } from '../../store/reducers/movies.slice';

const SingleMovie: FC = () => {
    const dispatch = useAppDispatch()
    const { selectedMovie } = useAppSelector(state => state.movies)
    const { isTabBarVisible } = useAppSelector(state => state.system)

    useEffect(() => {
        dispatch(getMovieCast({ movieId: selectedMovie!.id }))
        return () => {
            dispatch(setIsTabBarVisible(true))
            setSelectedMovie(null)
        }
    }, [isTabBarVisible])

    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={styles.scrollContainer}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${selectedMovie!.backdrop_path}` }}
                resizeMode="cover"
                imageStyle={{ resizeMode: "cover" }}
                style={styles.imageCover}
            >
                <LinearGradient
                    locations={[0.1, 0.45, 0.95]}
                    colors={[
                        "rgba(41, 48, 57, 0)",
                        "rgba(57, 54, 70, 0.45)",
                        Colors.primary1000,
                    ]}
                    style={styles.gradient}
                />
            </ImageBackground>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <CsText type={ECSTextTypes.Big} style={styles.movieTitle}>
                        {selectedMovie!.title}
                    </CsText>
                    <CsText type={ECSTextTypes.Small} style={styles.movieDetails}>
                        {getReleaseYear(selectedMovie!.release_date)} | {selectedMovie!.genres.map((genre: IGenre, index: number) => `${genre.name}${index !== selectedMovie!.genres.length - 1 ? ', ' : ''}`)} | {selectedMovie!.original_language.toUpperCase()}
                    </CsText>
                    <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                        {[...Array(5)].map((_, i) => {
                            return <FontAwesomeIcon color={i < voteAverageToStarRating(selectedMovie!.vote_average) ? Colors.gold : Colors.primary400} size={20} icon={faStar} key={i} style={{ marginEnd: 5 }} />
                        })}
                    </View>
                </View>
                <CsText type={ECSTextTypes.Smaller}>{selectedMovie!.overview}</CsText>
                {selectedMovie!.cast &&
                    <CsCastList cast={selectedMovie!.cast} />
                }
            </View>
        </ScrollView>
    );
};

export default SingleMovie

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.primary1000
    },
    imageCover: {
        width: "100%",
        height: SCREEN_HEIGHT * 0.3,
        position: "relative",
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        aspectRatio: 1,
        width: "100%",
        height: "30%",
    },
    container: {
        padding: 15,
        backgroundColor: Colors.primary1000,
    },
    movieTitle: {
        textAlign: 'center',
        marginBottom: 10
    },
    movieDetails: {
        marginBottom: 20,
        textAlign: 'center'
    },
})