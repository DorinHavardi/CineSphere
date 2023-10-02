import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';
import { ESocialConnectButtonTypes } from '../enums/ESocialConnectButtonTypes';
import { AppleIcon, FacebookIcon, GoogleIcon } from './svg';

const BUTTON_SIZE = 60;

interface ISocialConnectButton {
    type: ESocialConnectButtonTypes;
    onPress: () => void;
}

const SocialConnectButton: FC<ISocialConnectButton> = ({ type, onPress }) => {
    if (type === 'facebook') return <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: Colors.facebook }]}><FacebookIcon /></TouchableOpacity>
    if (type === 'google') return <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: Colors.google }]}><GoogleIcon /></TouchableOpacity>
    if (type === 'apple') return <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: Colors.apple }]}><AppleIcon /></TouchableOpacity>

    return null;
}

export default SocialConnectButton

const styles = StyleSheet.create({
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }
})