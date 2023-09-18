import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { SCREEN_HEIGHT } from '../utils/window.util';
import { Colors } from '../theme/colors';
import { fetchNewMovies } from '../store/reducers/movies.slice';
import { useAppDispatch, useAppSelector } from '../store/store';

const Main: FC = () => {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movies.movies);
    const status = useAppSelector((state) => state.movies.status);
    const error = useAppSelector((state) => state.movies.error);

    console.log("Status:", status);
    console.log("Number of movies:", movies.length);
    console.log("error:", error);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchNewMovies());
        }
    }, [status, dispatch]);

    interface MovieItem {
        poster_path: string;
        title: string;
    }

    const renderItem = ({ item }: { item: MovieItem }) => {
        console.log("item", item)
        return (
            <View style={styles.item}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
                <Text>{item.title}</Text>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
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
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },
    item: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 10,
    },
});
