import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/window.util';
import { Colors } from '../theme/colors';

interface ICsLoader {
    // children: ReactNode;
}

const CsLoader: FC<ICsLoader> = ({ }) => {
    return (
        <View style={styles.container}>
            <View style={styles.overlay} />
            <ActivityIndicator style={styles.activityIndicator} size="large" color={Colors.accent1000} />
        </View>
    );
}

export default CsLoader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
    ]),
    activityIndicator: {
        zIndex: 1,
    }
});
