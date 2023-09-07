import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';

interface ICSButton {
    text: string;
    onPress?: () => void;
}
const CSButton: FC<ICSButton> = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CSButton

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 50,
        backgroundColor: Colors.contrast,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    text: {
        color: Colors.accent1000,
        fontWeight: 'bold',
    }
})