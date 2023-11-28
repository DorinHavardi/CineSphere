import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '../../theme/colors';
import { CsCarousel } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';
import { ETVCategories } from '../../enums/ETMDBCategories';
import { getTVShows } from '../../store/thunks/tvShows.thunk';
import { useFocusEffect } from '@react-navigation/native';
import { setIsTabBarVisible } from '../../store/reducers/system.slice';

const TvShowsMain: FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { tvShows } = useAppSelector((state) => state.tvShows);

    useEffect(() => {
        // dispatch(getTVShows({ category: ETVCategories.AIRING_TODAY, page: 1 }));
        // dispatch(getTVShows({ category: ETVCategories.LATEST, page: 1 }));
        dispatch(getTVShows({ category: ETVCategories.ON_THE_AIR, page: 1 }));
        dispatch(getTVShows({ category: ETVCategories.POPULAR, page: 1 }));
        dispatch(getTVShows({ category: ETVCategories.TOP_RATED, page: 1 }));

    }, [dispatch]);

    useFocusEffect(() => {
        dispatch(setIsTabBarVisible(true))
    })

    return (
        <SafeAreaView style={styles.safeArea} >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
                {Object.entries(tvShows).map(([category, tvShowsInCategory]) => {
                    return (
                        <CsCarousel
                            key={category}
                            data={tvShowsInCategory}
                            // onEndReached={() => getNextPage(category as ETVCategories)}
                            title={t('tvShows.section_title', { category: t(`tvShows.title_options.${category}`) })}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
export default TvShowsMain;


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
