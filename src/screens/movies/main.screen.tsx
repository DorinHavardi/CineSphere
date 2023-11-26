import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

type PagesState = {
    [key in ETMDBCategories]?: number;
};

const Main: FC<IMain> = ({ }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamsList>>();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { movies, status } = useAppSelector((state) => state.movies);
    const [pages, setPages] = useState<PagesState>({});

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

    const getNextPage = useCallback((category: ETMDBCategories) => {
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
                            onEndReached={() => getNextPage(category as ETMDBCategories)}
                            title={t('main.section_title', { category: t(`main.title_options.${category}`) })}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
export default Main;


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
