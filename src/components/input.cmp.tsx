import { Animated, KeyboardTypeOptions, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Colors } from '../theme/colors';
import { getFontSizeByWindowWidth } from '../utils/window.util';
import { Fonts } from '../theme/fonts';
import { ECSTextTypes } from '../enums/ECSTextTypes';
import { CsText } from '.';

interface ICSInput {
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    icon?: ReactNode;
    secureTextEntry?: boolean;
    onChangeText?: (value: string) => void;
    value?: string | null;
    editable?: boolean;
    style?: TextStyle;
    onBlur?: (value: string) => void;
    isError?: boolean;
    errorText?: string;
}

const CSInput: FC<ICSInput> = ({ style, placeholder, keyboardType, icon, secureTextEntry, onChangeText, value, editable = true, onBlur, isError, errorText }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const animatedIsFocused = useRef(new Animated.Value((value && value !== '') ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedIsFocused, { // TODO: FIX ANIMATION PLACEHOLDER
            toValue: isFocused || (value && value !== '') ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle: Animated.WithAnimatedValue<TextStyle> = {
        position: 'absolute',
        fontFamily: Fonts.Poppins_Regular,
        left: 0,
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: editable ? ['#aaa', Colors.accent1000] : ["#A9A9A9", "#A9A9A9"],
        }),
    };

    return (
        <View style={{ paddingTop: 20, marginBottom: 10, width: "100%" }}>
            <Animated.Text style={labelStyle}>
                {placeholder}
            </Animated.Text>
            <TextInput
                style={[styles.input, {
                    color: editable ? Colors.accent1000 : "#A9A9A9",
                    borderBottomColor: editable ? Colors.primary500 : 'transparent',
                }, style]}
                selectionColor={Colors.primary500}
                placeholderTextColor={Colors.primary500}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value || undefined}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                blurOnSubmit
                editable={editable}
                autoCorrect={false}
            />
            <CsText type={ECSTextTypes.Smallest} style={styles.errorText} numberOfLines={2}>
                {errorText ? errorText : null}
            </CsText>
        </View>
    )
}

export default CSInput

const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 45,
        color: Colors.accent1000,
        borderBottomColor: Colors.primary500,
        borderBottomWidth: 2,
        fontSize: getFontSizeByWindowWidth(18),
        fontFamily: Fonts.Poppins_Regular,
    },
    errorText: {
        color: Colors.contrast,
        maxWidth: '90%'
    }
})