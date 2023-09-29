import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT } from '../utils/window.util';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CSText, { ECSTextTypes } from '../components/text.cmp';


interface ISingleMovie {
    route: any;
}

const SingleMovie: FC<ISingleMovie> = ({ route }) => {
    const movie = route.params.movie;
    const navigation = useNavigation();

    console.log("movie is: ", movie)

    const getReleaseYear = (date: string) => {
        return date?.split("-")[0];
    }

    return (
        <>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
                resizeMode="cover"
                imageStyle={{ resizeMode: "cover" }}
                style={styles.imageCover}

            >
                <LinearGradient
                    locations={[0.1, 0.45, 0.95]}
                    colors={[
                        "rgba(41, 48, 57, 0)",
                        "rgba(57, 54, 70, 0.45)",
                        Colors.primary1000,
                    ]}
                    style={styles.gradient}
                />
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: "25%", paddingHorizontal: 15 }}>
                    <FontAwesomeIcon icon={faChevronLeft} color={Colors.white} size={25} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.container}>
                <CSText type={ECSTextTypes.Big}>{movie.title}</CSText>
                <CSText type={ECSTextTypes.Small} style={{marginBottom: 20}}>
                     {getReleaseYear(movie.release_date)} | {movie.original_language.toUpperCase()}
                </CSText>
                <CSText type={ECSTextTypes.Small}>{movie.overview}</CSText>
            </View>
        </>
    );
};

export default SingleMovie

const styles = StyleSheet.create({
    imageCover: {
        width: "100%",
        height: SCREEN_HEIGHT * 0.3,
        position: "relative",
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        aspectRatio: 1,
        width: "100%",
        height: "30%",
    },
    container: {
        flex: 1,
        padding: 15,
        // paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },
})