import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { getFontSizeByWindowWidth } from '../utils/window.util';
import { Colors } from '../theme/colors';

export enum ECSTextTypes {
    Biggest = 'biggest',
    Bigger = 'bigger'
}

interface ICSText {
    children: ReactNode;
    type: ECSTextTypes;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
}

const CSText: FC<ICSText> = ({ children, type, style, numberOfLines }) => {
    if (type === "biggest")
        return (
            <Text style={[styles.biggest, style]} numberOfLines={numberOfLines}>{children}</Text>
        )
    else if (type === "bigger")
        return (
            <Text style={[styles.bigger, style]} numberOfLines={numberOfLines}>{children}</Text>
        )
    return (
        <Text numberOfLines={numberOfLines}>{children}</Text>
    )
}

export default CSText

const styles = StyleSheet.create({
    biggest: {
        fontSize: getFontSizeByWindowWidth(40),
        color: Colors.accent1000
    },
    bigger: {
        fontSize: getFontSizeByWindowWidth(36),
        color: Colors.accent1000
    }
})