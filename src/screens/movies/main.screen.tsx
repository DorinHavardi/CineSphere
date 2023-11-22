import { ScrollView, StyleSheet } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import { Colors } from '../../theme/colors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { setIsTabBarVisible } from '../../store/reducers/system.slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoviesStackParamsList } from '../../navigation/types/MoviesStackParamsList';
import { ETMDBCategories } from '../../enums/ETMDBCategories';
import { CsCarousel } from '../../components';
import { getGenres, getMovies } from '../../store/thunks/movies.thunk';

interface IMain {
}

const Main: FC<IMain> = ({ }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamsList>>();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { movies, status } = useAppSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getMovies({ category: ETMDBCategories.NOW_PLAYING, page: 1 }));
        dispatch(getMovies({ category: ETMDBCategories.POPULAR, page: 1 }));
        dispatch(getMovies({ category: ETMDBCategories.TOP_RATED, page: 1 }));
        dispatch(getMovies({ category: ETMDBCategories.UPCOMING, page: 1 }));
        dispatch(getGenres());
    }, [dispatch]);


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
                    />
                )
            })}
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
