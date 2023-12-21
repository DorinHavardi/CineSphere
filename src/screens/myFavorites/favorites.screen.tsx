import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT } from '../../utils/window.util'
import { Colors } from '../../theme/colors'
import { useAppSelector } from '../../store/store'
import { IItem } from '../../types/item.type'
import { CsCarousel } from '../../components'
import { IMovie } from '../../interfaces/IMovie'
import { ITVShow } from '../../interfaces/ITVShow'
import { useTranslation } from 'react-i18next'

const MyFavorites = () => {
    const { t } = useTranslation();
    const { favorites } = useAppSelector(state => state.auth.user!)

    const movies = favorites?.filter((item: IItem) => (item as IMovie).title !== undefined)
    const tvShows = favorites?.filter((item: IItem) => (item as ITVShow).name !== undefined)

    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={{ backgroundColor: Colors.primary1000 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <CsCarousel
                        showChevron={false}
                        data={movies as IMovie[]}
                        title={t('favorites.movies_title')}
                    />
                    <CsCarousel
                        showChevron={false}
                        data={tvShows as ITVShow[]}
                        title={t('favorites.tv_shows_title')}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default MyFavorites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT,
        padding: 15,
        alignItems: 'center',
        backgroundColor: Colors.primary1000,
    },
    content: {
        marginTop: "10%",
        alignItems: 'center',
    },
})