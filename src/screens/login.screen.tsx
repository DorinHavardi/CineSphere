import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CsButton, CsInput, CsText } from '../components'
import { ECSTextTypes } from '../components/text.cmp'

const Login = () => {
    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>CineSphere</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>Login</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder='Email' />
                <CsInput placeholder='Password' secureTextEntry />
                <CsButton text="login"/>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20
    },
    methodsContainer: {

    }
})