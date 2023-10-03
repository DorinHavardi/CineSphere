import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SCREEN_HEIGHT } from '../utils/window.util';
import { Colors } from '../theme/colors';
import { fetchNewMovies, fetchUpcomingMovies, getMoviesGenres, setSelectedMovie } from '../store/reducers/movies.slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import CSText from '../components/text.cmp';
import { IMovie } from '../interfaces/IMovie';
import { ECSTextTypes } from '../enums/ECSTextTypes';
import { setIsTabBarVisible } from '../store/reducers/system.slice';

interface IMain {
    navigation: any;
}

const Main: FC<IMain> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { movies, status } = useAppSelector((state) => state.movies);
    const { newMovies, upcomingMovies } = movies

    useEffect(() => {
        // dispatch(setIsLoading(false));
        if (status === 'idle') {
            dispatch(fetchNewMovies());
            dispatch(fetchUpcomingMovies());
            dispatch(getMoviesGenres());

        }
    }, [status, dispatch]);

    const renderItem = ({ item }: { item: IMovie }, index: number) => {
        return (
            <TouchableOpacity style={[styles.item]} onPress={() => {
                dispatch(setSelectedMovie(item))
                dispatch(setIsTabBarVisible(false))
                navigation.navigate('singleMovie', { movie: item })
            }}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} resizeMode='cover' />
                <CSText style={{ color: Colors.white, textAlign: 'center' }} type={ECSTextTypes.Small} maxLength={15}>{item.title}</CSText>
            </TouchableOpacity>
        )
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            <CSText style={{ color: Colors.white, }} type={ECSTextTypes.Big}>{t('main.sectionTitle', { category: t('main.titleOptions.new') })}</CSText>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={newMovies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
            />
            <CSText style={{ color: Colors.white, }} type={ECSTextTypes.Big}>{t('main.sectionTitle', { category: t('main.titleOptions.upcoming') })}</CSText>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={upcomingMovies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
            />
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
    item: {
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: 140,
        height: 220,
        borderRadius: 6,
        marginBottom: 10,

    },
    flatlist: {
    }
});
