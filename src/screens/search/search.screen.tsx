import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SCREEN_HEIGHT, getFontSizeByWindowWidth } from '../../utils/window.util'
import { Colors } from '../../theme/colors'
import { CsCarousel, CsInput, CsText } from '../../components'
import { ECSTextTypes } from '../../enums/ECSTextTypes'
import { SearchResult, searchTMDb } from '../../utils/TMDB.util'
import { IItem } from '../../types/item.type'
import { useTranslation } from 'react-i18next'

const Search = () => {
    const { t } = useTranslation();
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>();


    useEffect(() => {
        if (searchValue.length >= 3) {
            searchTMDb(searchValue)
                .then(results => setSearchResults(results))
                .catch(error => console.error('Error on Search:', error));
        }
        else {
            setSearchResults([])
        }

    }, [searchValue])

    return (
        // <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={{ backgroundColor: Colors.primary1000 }}>
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <CsText type={ECSTextTypes.Bigger}>Find</CsText>
                <CsText type={ECSTextTypes.Small}>Search for a movie or a tv show </CsText>
                <CsInput onChangeText={(value) => setSearchValue(value)} style={{ borderWidth: 2, borderColor: Colors.primary500, borderRadius: 20, paddingHorizontal: 20, }} />
                <CsCarousel
                    titleStyle={{ fontSize: getFontSizeByWindowWidth(22) }}
                    horizontal={false}
                    showChevron={false}
                    data={searchResults as IItem[]}
                    title={searchResults?.length ? t('search.results', { amount: searchResults?.length }) : ""}
                />
            </View>
        </SafeAreaView>
        // </ScrollView>
    )

}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        backgroundColor: Colors.primary1000,
    },
    content: {
        marginTop: "10%",
        alignItems: 'center',
    },
})