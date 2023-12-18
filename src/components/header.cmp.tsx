import { TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Colors } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_WIDTH } from '../utils/window.util'

const Header = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesomeIcon icon={faChevronLeft} color={Colors.white} size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.backButton}>
                <FontAwesomeIcon icon={faHeart} style={{ color: Colors.contrast }} size={25} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Header

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