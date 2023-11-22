import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
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

interface ICarousel {
    data: IMovie[];
    title?: string;
}
const Carousel: FC<ICarousel> = ({ data, title }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamsList>>();
    const dispatch = useAppDispatch();

    const itemCard = ({ item, index }: { item: IMovie; index: number }) => {
        return (
            <TouchableOpacity style={[styles.item]}
                onPress={() => {
                    dispatch(setSelectedMovie(item))
                    dispatch(setIsTabBarVisible(false))
                    navigation.navigate(EMovieStackRoutes.SingleMovie, { movie: item })
                }}
            >
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} resizeMode='cover' />
                <CsText style={{ color: Colors.white, textAlign: 'center' }} type={ECSTextTypes.Small} numberOfLines={2}>{item.title}</CsText>
            </TouchableOpacity>
        )
    };
    return (
        <View>
            {title && <CsText type={ECSTextTypes.Big} style={{marginBottom: 10}}>{title}</CsText>}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={itemCard}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
            />
        </View>
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
    image: {
        width: 140,
        height: 220,
        borderRadius: 6,
        marginBottom: 10,

    },
})