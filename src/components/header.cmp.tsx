import { TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Colors } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_WIDTH } from '../utils/window.util'

const Header = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ position: 'absolute', width: SCREEN_WIDTH }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesomeIcon icon={faChevronLeft} color={Colors.white} size={25} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    backButton: {
        paddingHorizontal: 10,
    },
})