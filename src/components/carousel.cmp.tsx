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
import { setIsTabBarVisible } from '../store/reducers/system.slice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ITVShow } from '../interfaces/ITVShow';
import { getMovie } from '../store/thunks/movies.thunk';
import { ETVShowsStackRoutes } from '../enums/ETVShowsStackRoutes';
import { getTVShow } from '../store/thunks/tvShows.thunk';
import { TVShowStackParamsList } from '../navigation/types/TVShowStackParamsList';
import { setSelectedMovie } from '../store/reducers/movies.slice';
import { setSelectedTvShow } from '../store/reducers/tvShows.slice';
import { EMovieStackRoutes } from '../enums/EMovieStackRoutes';
import { IItem } from '../types/item.type';
interface ICarousel {
    data: IMovie[] | ITVShow[];
    title?: string;
    onEndReached?: () => void;
    showChevron?: boolean;
}

const ItemCard = React.memo(({ item, onPress }: { item: IItem, onPress: () => void }) => {
    const title = (item as IMovie).title || (item as ITVShow).name;
    return (
        <TouchableOpacity style={[styles.item]} onPress={onPress}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} resizeMode='cover' />
            <CsText style={styles.movieTitle} type={ECSTextTypes.Small} numberOfLines={2}>{title}</CsText>
        </TouchableOpacity>
    )
});

const Carousel: FC<ICarousel> = ({ data, title, onEndReached, showChevron = true }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamsList | TVShowStackParamsList>>();
    const dispatch = useAppDispatch();

    const renderItem = ({ item }: { item: IItem }) => (
        <ItemCard item={item} onPress={() => handlePress(item)} />
    )

    const handlePress = useCallback(async (item: IItem) => {
        const isMovie = (item as IMovie).title !== undefined;

        if (isMovie) {
            const selectedMovie = await dispatch(getMovie({ movieId: item.id })).unwrap();
            dispatch(setSelectedMovie(selectedMovie));
            navigation.navigate(EMovieStackRoutes.SingleMovie as never);
        } else {
            const selectedTVShow = await dispatch(getTVShow({ tvShowId: item.id })).unwrap();
            dispatch(setSelectedTvShow(selectedTVShow));
            navigation.navigate(ETVShowsStackRoutes.SingleTVShow as never);
        }
        dispatch(setIsTabBarVisible(false));
    }, [dispatch, navigation]);



    return (
        <>
            {title && <CsText type={ECSTextTypes.Big} style={{ marginBottom: 10 }}>{title}</CsText>}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
                ListFooterComponent={() => showChevron ? (
                    <TouchableOpacity onPress={onEndReached} style={styles.endButton}>
                        <CsText type={ECSTextTypes.Biggest}>
                            <FontAwesomeIcon icon={faArrowRight} color={Colors.accent1000} size={30} />
                        </CsText>
                    </TouchableOpacity>
                ) : null}
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