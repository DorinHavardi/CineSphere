import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faStar, } from '@fortawesome/free-solid-svg-icons';
import CSText from '../../components/text.cmp';
import { getGenresNames, voteAverageToStarRating } from '../../utils/movies.util';
import { ECSTextTypes } from '../../enums/ECSTextTypes';
import { ICast } from '../../interfaces/ICast';
import { setIsTabBarVisible } from '../../store/reducers/system.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMovieCast } from '../../store/thunks/movies.thunk';


interface ISingleMovie {
    route: any;
}

const SingleMovie: FC<ISingleMovie> = ({ route }) => {
    const movie = route.params.movie;
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const { genres, selectedMovie } = useAppSelector(state => state.movies)
    const { isTabBarVisible } = useAppSelector(state => state.system)

    useEffect(() => {
        dispatch(getMovieCast(movie.id))
        return () => {
            dispatch(setIsTabBarVisible(true))
        }
    }, [isTabBarVisible])




    const getReleaseYear = (date: string) => (date?.split("-")[0]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={{ flex: 1, height: SCREEN_HEIGHT, backgroundColor: Colors.primary1000 }}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: "25%", paddingHorizontal: 15 }}>
                    <FontAwesomeIcon icon={faChevronLeft} color={Colors.white} size={25} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <CSText type={ECSTextTypes.Big} style={{ textAlign: 'center', lineHeight: 35, marginBottom: 10 }}>{movie.title}</CSText>
                    <CSText type={ECSTextTypes.Small} style={{ marginBottom: 20, textAlign: 'center' }}>
                        {getReleaseYear(movie.release_date)} | {getGenresNames(movie.genre_ids, genres)} | {movie.original_language.toUpperCase()}
                    </CSText>
                    <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                        {[...Array(5)].map((_, i) => {
                            return <FontAwesomeIcon color={i < voteAverageToStarRating(movie.vote_average) ? Colors.gold : Colors.primary400} size={20} icon={faStar} key={i} style={{ marginEnd: 5 }} />
                        })}
                    </View>
                </View>
                <CSText type={ECSTextTypes.Smaller}>{movie.overview}</CSText>
                <CSText type={ECSTextTypes.Small} style={{ marginVertical: 10, fontWeight: 'bold' }}>Cast</CSText>
                <ScrollView style={{ flexDirection: 'row' }} horizontal showsHorizontalScrollIndicator={false}>
                    {selectedMovie?.cast && selectedMovie.cast.map((actor: ICast, index: number) => {
                        if (index < 5)
                            return (
                                <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }} key={index}>
                                    <Image style={styles.actorImage} source={{ uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}` }} />
                                    <CSText type={ECSTextTypes.Smaller} style={{ textAlign: 'center' }} maxLength={12}>{actor.name}</CSText>
                                </View>
                            )
                    })}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

export default SingleMovie

const styles = StyleSheet.create({
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
    actorImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary500
    }
})