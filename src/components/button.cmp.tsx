import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';
import { getFontSizeByWindowWidth } from '../utils/window.util';
import { Fonts } from '../theme/fonts';

interface ICSButton {
    text: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    outlined?: boolean;
}
const CSButton: FC<ICSButton> = ({ text, onPress, buttonStyle, textStyle, outlined }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: outlined ? 'transparent' : Colors.contrast,
                    borderWidth: outlined ? 1 : undefined,
                    borderColor: outlined ? Colors.accent1000 : undefined
                },
                buttonStyle
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,
                    { fontFamily: outlined ? Fonts.Poppins_Light : Fonts.Poppins_Bold },
                    textStyle
                ]}>{text}</Text>
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
        fontSize: getFontSizeByWindowWidth(20),
        fontFamily: Fonts.Poppins_Bold,
    }
})