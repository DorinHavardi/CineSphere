import { ScrollView, StyleSheet } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import { Colors } from '../../theme/colors';
import { setMovies } from '../../store/reducers/movies.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { setIsTabBarVisible } from '../../store/reducers/system.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoviesStackParamsList } from '../../navigation/types/MoviesStackParamsList';
import { ETMDBCategories } from '../../enums/ETMDBCategories';
import { fetchMovies } from '../../services/movies.service';
import { CsCarousel } from '../../components';

interface IMain {
}

const Main: FC<IMain> = ({ }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamsList>>();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { movies, status } = useAppSelector((state) => state.movies);
    const { now_playing, popular, top_rated, upcoming } = movies

    const handleFetchMovies = async (category: ETMDBCategories, page: number) => {
        try {
            const movies = await fetchMovies(category, page); // Assuming page 1 for simplicity
            dispatch(setMovies({ category, movies }));
        } catch (error) {
            console.error("Failed to fetch movies:", error.message);
        }
    };
    useEffect(() => {
        handleFetchMovies(ETMDBCategories.NOW_PLAYING, 1);
        handleFetchMovies(ETMDBCategories.POPULAR, 1);
        handleFetchMovies(ETMDBCategories.TOP_RATED, 1);
        handleFetchMovies(ETMDBCategories.UPCOMING, 1);
    }, [status, dispatch]);

    useFocusEffect(() => {
        dispatch(setIsTabBarVisible(true))
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            {Object.entries(movies).map(([category, moviesInCategory]) => {
                return (
                    <CsCarousel
                        key={category}
                        data={moviesInCategory}
                        title={t('main.section_title', { category: t(`main.title_options.${category}`) })}
                    // onPress={(item) => {
                    //     dispatch(setSelectedMovie(item))
                    //     dispatch(setIsTabBarVisible(false))
                    //     navigation.navigate(EMovieStackRoutes.SingleMovie, { movie: item })
                    // }}
                    />
                )
            })}


            {/* <CsCarousel
                data={now_playing}
                title={t('main.section_title', { category: t('main.title_options.new') })}
                onPress={(item) => {
                    dispatch(setSelectedMovie(item))
                    dispatch(setIsTabBarVisible(false))
                    navigation.navigate(EMovieStackRoutes.SingleMovie, { movie: item })
                }}
            /> */}

        </ScrollView>
    );
};
export default Main;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },

});
