import { TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons'
import { Colors } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_WIDTH } from '../utils/window.util'
import { IItem } from '../types/item.type'
import { getFavoritesFromFirebase, removeFavoriteFromFirebase, saveFavoritesToFirebase } from '../utils/firebase.util'
import { useAppSelector } from '../store/store'

interface IHeader {
    currentItem: IItem;
}

const Header: FC<IHeader> = ({ currentItem }) => {
    const navigation = useNavigation();
    const { id: userId } = useAppSelector(state => state.auth.user)
    const [favorites, setFavorites] = useState<IItem[]>([]);

    useEffect(() => {
        getFavoritesFromFirebase(userId)
            .then(fetchedFavorites => setFavorites(fetchedFavorites))
            .catch(error => console.error('Error fetching favorites:', error));
    }, [userId, favorites]);

    const isFavorite = favorites.some(favorite => favorite.id === currentItem.id);

    const handleFavoritePress = async () => {
        if (isFavorite) {
            await removeFavoriteFromFirebase(userId, currentItem);
        } else {
            await saveFavoritesToFirebase(userId, currentItem);
            // Update the local state to reflect the new favorites
            setFavorites([...favorites, currentItem]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesomeIcon icon={faChevronLeft} color={Colors.white} size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFavoritePress()} style={styles.backButton}>
                <FontAwesomeIcon icon={isFavorite ? faHeartFilled : faHeart} color={Colors.contrast} size={25} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        paddingHorizontal: 10,
    },
})