import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../theme/colors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useFocusEffect } from '@react-navigation/native';
import { setIsTabBarVisible } from '../../store/reducers/system.slice';
import { CsCarousel } from '../../components';
import { getGenres, getMovies } from '../../store/thunks/movies.thunk';
import { EMoviesCategories } from '../../enums/ETMDBCategories';

type PagesState = {
    [key in EMoviesCategories]?: number;
};

const MoviesMain: FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { movies } = useAppSelector((state) => state.movies);
    const [pages, setPages] = useState<PagesState>({});

    useEffect(() => {
        dispatch(getMovies({ category: EMoviesCategories.NOW_PLAYING, page: 1 }));
        dispatch(getMovies({ category: EMoviesCategories.POPULAR, page: 1 }));
        dispatch(getMovies({ category: EMoviesCategories.TOP_RATED, page: 1 }));
        dispatch(getMovies({ category: EMoviesCategories.UPCOMING, page: 1 }));
        dispatch(getGenres());
    }, [dispatch]);

    useFocusEffect(() => {
        dispatch(setIsTabBarVisible(true))
    })

    const getNextPage = useCallback((category: EMoviesCategories) => {
        const currentPage = pages[category] || 1;
        const newPage = currentPage + 1;

        setPages(prevPages => ({ ...prevPages, [category]: newPage }));
        dispatch(getMovies({ category, page: newPage }));
    }, [dispatch, pages]);

    return (
        <SafeAreaView style={styles.safeArea} >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
                {Object.entries(movies).map(([category, moviesInCategory]) => {
                    return (
                        <CsCarousel
                            key={category}
                            data={moviesInCategory}
                            onEndReached={() => getNextPage(category as EMoviesCategories)}
                            title={t('movies.section_title', { category: t(`movies.title_options.${category}`) })}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
export default MoviesMain;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.primary1000,
    },
    container: {
        marginVertical: "4%",
        paddingHorizontal: 15,
    }
});
