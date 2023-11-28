import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useCallback } from 'react';

import { IMovie } from '../interfaces/IMovie';
import { CsText } from '.';
import { ECSTextTypes } from '../enums/ECSTextTypes';
import { Colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoviesStackParamsList } from '../navigation/types/MoviesStackParamsList';
import { setSelectedMovie } from '../store/reducers/movies.slice';
import { setIsTabBarVisible } from '../store/reducers/system.slice';
import { EMovieStackRoutes } from '../enums/EMovieStackRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ITVShow } from '../interfaces/ITVShow';


interface ICarousel {
    data: IMovie[] | ITVShow[];
    title?: string;
    onEndReached?: () => void;
}

const ItemCard = React.memo(({ item, onPress }: { item: IMovie | ITVShow, onPress: () => void }) => {
    return (
        <TouchableOpacity style={[styles.item]} onPress={onPress}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} resizeMode='cover' />
            <CsText style={styles.movieTitle} type={ECSTextTypes.Small} numberOfLines={2}>{item.title}</CsText>
        </TouchableOpacity>
    )
});

const Carousel: FC<ICarousel> = ({ data, title, onEndReached }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamsList>>();
    const dispatch = useAppDispatch();

    const handlePress = useCallback((item: IMovie | ITVShow) => {
        dispatch(setSelectedMovie(item));
        dispatch(setIsTabBarVisible(false));
        navigation.navigate(EMovieStackRoutes.SingleMovie, { movie: item });
    }, [dispatch, navigation]);


    return (
        <>
            {title && <CsText type={ECSTextTypes.Big} style={{ marginBottom: 10 }}>{title}</CsText>}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <ItemCard item={item} onPress={() => handlePress(item)} />
                )} keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
                ListFooterComponent={() => (
                    <TouchableOpacity onPress={onEndReached} style={styles.endButton}>
                        <CsText type={ECSTextTypes.Biggest}><FontAwesomeIcon icon={faArrowRight} color={Colors.accent1000} size={30} /></CsText>
                    </TouchableOpacity>
                )}
            />
        </>
    )
}

export default Carousel;

const styles = StyleSheet.create({
    flatlist: {
        marginBottom: 25
    },
    item: {
        margin: 10,
        alignItems: 'center',
        width: 150

    },
    movieTitle: {
        color: Colors.white,
        textAlign: 'center'
    },
    image: {
        width: 140,
        height: 220,
        borderRadius: 6,
        marginBottom: 10,

    },
    endButton: {
        height: 220,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})