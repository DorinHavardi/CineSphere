import React, { FC, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { CsButton, CsInput, CsSocialConnect, CsText } from '../components'
import { Colors } from '../theme/colors'
import { ESocialConnectButtonTypes } from '../components/socialButton.cmp'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailPassword } from '../utils/firebase.util'
import { SCREEN_HEIGHT } from '../utils/window.util'
import { ECSTextTypes } from '../enums/ECSTextTypes'

const Login: FC = ({ }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>CineSphere</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>Login</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder='Email' onChangeText={(value: string) => setEmail(value)} />
                <CsInput placeholder='Password' onChangeText={(value: string) => setPassword(value)} secureTextEntry />
                <CsButton text="Login" onPress={() => signInWithEmailPassword(email, password)} buttonStyle={{ marginTop: 50 }} />
                <View style={styles.socialConnectContainer}>
                    <CsText type={ECSTextTypes.Small} style={styles.noAccountText}>Or sign in with </CsText>
                    <View style={styles.socialButtonsContainer}>
                        <CsSocialConnect type={ESocialConnectButtonTypes.Facebook} />
                        <CsSocialConnect type={ESocialConnectButtonTypes.Google} />
                        <CsSocialConnect type={ESocialConnectButtonTypes.Apple} />
                    </View>
                </View>
            </View>
            <View style={styles.noAccount}>
                <CsText type={ECSTextTypes.Small} style={styles.noAccountText}>Dont have an account? </CsText>
                <Pressable onPress={() => navigation.navigate('register')}><CsText type={ECSTextTypes.Small} style={[styles.noAccountText, { color: Colors.accent1000 }]}>Register</CsText></Pressable>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },
    methodsContainer: {
    },
    socialConnectContainer: {
        alignItems: 'center',
        marginVertical: 35,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    noAccount: {
        flexDirection: "row",
        marginTop: 25
    },
    noAccountText: {
        color: Colors.primary500
    }
})