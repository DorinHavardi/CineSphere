import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { SCREEN_HEIGHT } from '../utils/window.util';
import { Colors } from '../theme/colors';
import { fetchNewMovies, getMoviesGenres } from '../store/reducers/movies.slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import CSText, { ECSTextTypes } from '../components/text.cmp';

interface IMain {
    navigation: any;
}

const Main: FC<IMain> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { movies, status } = useAppSelector((state) => state.movies);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchNewMovies());
            dispatch(getMoviesGenres());
        }
    }, [status, dispatch]);

    interface MovieItem {
        id: string | number;
        poster_path: string;
        title: string;
    }

    const renderItem = ({ item }: { item: MovieItem }, index: number) => {
        return (
            <TouchableOpacity style={[styles.item]} onPress={() => navigation.navigate('singleMovie', { movie: item })}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} resizeMode='cover' />
                <CSText style={{ color: Colors.white, textAlign: 'center' }} type={ECSTextTypes.Small} maxLength={15}>{item.title}</CSText>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <CSText style={{ color: Colors.white, }} type={ECSTextTypes.Big}>New Movies</CSText>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
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
});
