import React from 'react'
import { StyleSheet, View } from 'react-native'
import CSText, { ECSTextTypes } from '../components/text.cmp'

const Login = () => {
    return (
        <View style={styles.container}>
            <CSText type={ECSTextTypes.Biggest}>CineSphere</CSText>
            <CSText type={ECSTextTypes.Bigger}>Login</CSText>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
})