import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../theme/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { CsCastList, CsText } from '../../components'
import { ECSTextTypes } from '../../enums/ECSTextTypes'
import { getReleaseYear, voteAverageToStarRating } from '../../utils/TMDB.util'
import { SCREEN_HEIGHT } from '../../utils/window.util'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getTvShowCast } from '../../store/thunks/tvShows.thunk'
import { setIsTabBarVisible } from '../../store/reducers/system.slice'
import { IGenre } from '../../interfaces/IGenre'

const SingleTVShow = () => {
    const dispatch = useAppDispatch()
    const { selectedTvShow } = useAppSelector(state => state.tvShows)
    const { isTabBarVisible } = useAppSelector(state => state.system)

    useEffect(() => {
        dispatch(getTvShowCast({ tvShowId: selectedTvShow!.id }))
        return () => {
            dispatch(setIsTabBarVisible(true))
        }
    }, [isTabBarVisible])

    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={styles.scrollContainer}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${selectedTvShow!.backdrop_path}` }}
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
            </ImageBackground>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <CsText type={ECSTextTypes.Big} style={styles.tvShowTitle}>{selectedTvShow!.name}</CsText>
                    <CsText type={ECSTextTypes.Small} style={styles.tvShowDetails}>
                        {getReleaseYear(selectedTvShow!.first_air_date)} | {selectedTvShow!.genres.map((genre: IGenre, index: number) => `${genre.name}${index !== selectedTvShow!.genres.length - 1 ? ', ' : ''}`)} | {selectedTvShow!.original_language.toUpperCase()}
                    </CsText>
                    <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                        {[...Array(5)].map((_, i) => {
                            return <FontAwesomeIcon color={i < voteAverageToStarRating(selectedTvShow!.vote_average) ? Colors.gold : Colors.primary400} size={20} icon={faStar} key={i} style={{ marginEnd: 5 }} />
                        })}
                    </View>
                </View>
                <CsText type={ECSTextTypes.Smaller}>{selectedTvShow!.overview}</CsText>
                {selectedTvShow?.cast &&
                    <CsCastList cast={selectedTvShow!.cast} />
                }
            </View>
        </ScrollView>

    )
}

export default SingleTVShow

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.primary1000
    },
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
        aspectRatio: 1,
        width: "100%",
        height: "30%",
    },
    backButton: {
        position: 'absolute',
        top: "25%",
        paddingHorizontal: 15
    },
    container: {
        padding: 15,
        backgroundColor: Colors.primary1000,
    },
    tvShowTitle: {
        textAlign: 'center',
        marginBottom: 10
    },
    tvShowDetails: {
        marginBottom: 20,
        textAlign: 'center'
    },
})