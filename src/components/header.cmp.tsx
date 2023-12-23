import { TouchableOpacity, StyleSheet, SafeAreaView, View } from 'react-native'
import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons'
import { Colors } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_WIDTH } from '../utils/window.util'
import { IItem } from '../types/item.type'
import { removeFavoriteFromFirebase, saveFavoritesToFirebase } from '../utils/firebase.util'
import { useAppDispatch, useAppSelector } from '../store/store'
import { EProfileStackRoutes } from '../enums/EProfileStackRoutes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ProfileStackParamsList } from '../navigation/types/ProfileStackParamsList'
import { setFavorites } from '../store/reducers/auth.slice'

interface IHeader {
    currentItem: IItem | null;
    canGoBack?: boolean;
    showFavorite?: boolean;
    isProfileScreen?: boolean;
}

const Header: FC<IHeader> = ({ currentItem, canGoBack = true, showFavorite = true, isProfileScreen = false }) => {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamsList>>();
    const dispatch = useAppDispatch();
    const { id: userId, favorites } = useAppSelector(state => state.auth.user!)


    const isFavorite = canGoBack ? favorites?.some(favorite => favorite.id === currentItem?.id) : false;

    const handleFavoritePress = async () => {
        if (!canGoBack) {
            navigation.navigate(EProfileStackRoutes.MyFavorites)
        }
        else {
            if (isFavorite) {
                await removeFavoriteFromFirebase(userId!, currentItem!);
            } else {
                await saveFavoritesToFirebase(userId!, currentItem!);
                // Update the local state to reflect the new favorites
                if (favorites) {
                    dispatch(setFavorites([...favorites, currentItem!]))
                };
            }
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: showFavorite ? 'transparent' : Colors.primary1000 }]}>
            <View>
                {canGoBack &&
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                        <FontAwesomeIcon icon={faChevronLeft} color={Colors.white} size={25} />
                    </TouchableOpacity>
                }
            </View>
            <View>
                {showFavorite &&
                    <TouchableOpacity onPress={() => handleFavoritePress()} style={styles.button}>
                        <FontAwesomeIcon icon={isFavorite ? faHeartFilled : faHeart} color={Colors.contrast} size={25} />
                    </TouchableOpacity>}
                {isProfileScreen &&
                    <TouchableOpacity onPress={() => handleFavoritePress()} style={styles.button}>
                        <FontAwesomeIcon icon={favorites && favorites.length > 0 ? faHeartFilled : faHeart} color={Colors.contrast} size={25} />
                    </TouchableOpacity>}
            </View>
        </SafeAreaView>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 100,
    },
    button: {
        paddingHorizontal: 20,
    },
})