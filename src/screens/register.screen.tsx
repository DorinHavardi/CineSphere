import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CsButton, CsInput, CsText } from '../components'
import { ECSTextTypes } from '../components/text.cmp'

const Register = () => {
    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>CineSphere</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>Register</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder='Email' />
                <CsInput placeholder='First name' />
                <CsInput placeholder='Last name' />
                <CsInput placeholder='Password' secureTextEntry />
                <CsInput placeholder='Confirm Password' secureTextEntry />
                <CsButton text="Register" />
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20
    },
    methodsContainer: {

    }
})