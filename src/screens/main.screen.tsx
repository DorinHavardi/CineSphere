import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { SCREEN_HEIGHT } from '../utils/window.util';
import { Colors } from '../theme/colors';

const Main: FC = () => {
    return (
        <View style={styles.container}>
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },
})