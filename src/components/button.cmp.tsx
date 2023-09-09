import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';
import { getFontSizeByWindowWidth } from '../utils/window.util';

interface ICSButton {
    text: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}
const CSButton: FC<ICSButton> = ({ text, onPress, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CSButton;

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
        fontSize: getFontSizeByWindowWidth(20)
    }
})