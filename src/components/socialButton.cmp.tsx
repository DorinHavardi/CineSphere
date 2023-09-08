import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';
import AppleIcon from './svg/apple.icon';
import GoogleIcon from './svg/google.icon';
import FacebookIcon from './svg/facebook.icon';

const BUTTON_SIZE = 65;

export enum ESocialConnectButtonTypes {
    Facebook = "facebook",
    Google = "google",
    Apple = "apple"
}

interface ISocialConnectButton {
    type: ESocialConnectButtonTypes;

}

const SocialConnectButton: FC<ISocialConnectButton> = ({ type }) => {
    if (type === 'facebook') return <TouchableOpacity style={[styles.button, { backgroundColor: Colors.facebook }]}><FacebookIcon /></TouchableOpacity>
    if (type === 'google') return <TouchableOpacity style={[styles.button, { backgroundColor: Colors.google }]}><GoogleIcon /></TouchableOpacity>
    if (type === 'apple') return <TouchableOpacity style={[styles.button, { backgroundColor: Colors.apple }]}><AppleIcon /></TouchableOpacity>

    return (
        null
    )
}

export default SocialConnectButton

const styles = StyleSheet.create({
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})