import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { Colors } from '../theme/colors';
import { getFontSizeByWindowWidth } from '../utils/window.util';

interface ICSInput {
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    icon?: ReactNode;
    secureTextEntry?: boolean;
}

const CSInput: FC<ICSInput> = ({ placeholder, keyboardType, icon, secureTextEntry }) => {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor={Colors.primary500}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
        />
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
        marginBottom: 10,
        fontSize: getFontSizeByWindowWidth(18)
    }
})