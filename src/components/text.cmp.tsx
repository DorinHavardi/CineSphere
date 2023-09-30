import { StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import { getFontSizeByWindowWidth } from '../utils/window.util';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { ICSText } from '../interfaces/ICSText';

const CSText: FC<ICSText> = ({ children, type, style, numberOfLines, maxLength }) => {
    let displayedText = children;

    if (typeof children === "string" && maxLength) {
        const segments = [];
        let startIdx = 0;

        while (startIdx < children.length) {
            let endIdx = startIdx + maxLength;
            if (endIdx < children.length) {
                while (endIdx > startIdx && children[endIdx] !== ' ') {
                    endIdx--;
                }
                if (endIdx === startIdx) {
                    // Word is longer than maxLength, just break mid-word
                    endIdx = startIdx + maxLength;
                }
            }
            segments.push(children.slice(startIdx, endIdx));
            startIdx = endIdx;
        }

        displayedText = segments.join('\n');
    }

    const textStyles = styles[type] || {};

    return (
        <Text style={[textStyles, style]} numberOfLines={numberOfLines}>
            {displayedText}
        </Text>
    )
}

export default CSText

const styles = StyleSheet.create({
    biggest: {
        fontSize: getFontSizeByWindowWidth(40),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.accent1000,
    },
    bigger: {
        fontSize: getFontSizeByWindowWidth(36),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.accent1000,
    },
    big: {
        fontSize: getFontSizeByWindowWidth(30),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.accent1000,
    },
    small: {
        fontSize: getFontSizeByWindowWidth(18),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.accent1000,
    },
    smaller: {
        fontSize: getFontSizeByWindowWidth(16),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.accent1000,
    },
    smallest: {
        fontSize: getFontSizeByWindowWidth(14),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.accent1000,
    },
})