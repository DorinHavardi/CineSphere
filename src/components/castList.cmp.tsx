import { FlatList, Image, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { ICast } from '../interfaces/ICast';
import { ECSTextTypes } from '../enums/ECSTextTypes';
import { CsText } from '.';
import { useTranslation } from 'react-i18next';
import { Colors } from '../theme/colors';

interface ICastList {
    cast: ICast[];
}
const CastList: FC<ICastList> = ({ cast }) => {
    const { t } = useTranslation();
    const filteredCast = cast.filter((actor: ICast) => actor.profile_path !== null)
    const renderItem = ({ item }: { item: ICast }) => (
        <View style={styles.castContainer} key={item.id}>
            <Image style={styles.actorImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }} />
            <CsText type={ECSTextTypes.Smaller} style={{ textAlign: 'center' }} numberOfLines={2}>{item.name}</CsText>
        </View>
    )
    return (
        <>
            <CsText type={ECSTextTypes.Small} style={styles.castTitle}>
                {t('movie_screen.cast')}
            </CsText>
            <FlatList horizontal data={filteredCast} renderItem={renderItem} showsHorizontalScrollIndicator={false} />
        </>
    )
}

export default CastList

const styles = StyleSheet.create({
    castTitle: {
        marginVertical: 10,
        fontWeight: 'bold'
    },
    castContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 7,
        width: 120,
    },
    actorImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary500
    }
})