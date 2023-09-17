import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { CsButton, CsInput, CsText } from '../components'
import { ECSTextTypes } from '../components/text.cmp'
import { SCREEN_HEIGHT } from '../utils/window.util'
import { Colors } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { signUpWithEmailPassword } from '../utils/firebase.util'
import { setUser } from '../store/reducers/auth.slice'
import { useDispatch } from 'react-redux'

const Register = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>CineSphere</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>Register</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder='Email' onChangeText={(value: string) => setEmail(value)} />
                <CsInput placeholder='First name' onChangeText={(value: string) => setFirstName(value)} />
                <CsInput placeholder='Last name' onChangeText={(value: string) => setLastName(value)} />
                <CsInput placeholder='Password' onChangeText={(value: string) => setPassword(value)} secureTextEntry />
                <CsInput placeholder='Confirm Password' onChangeText={(value: string) => setConfirmPassword(value)} secureTextEntry />
                <CsButton
                    text="Register"
                    onPress={() => {
                        signUpWithEmailPassword(email, password)
                            .then((user) => {
                                dispatch(setUser(user))
                                // navigation.navigate('Main');
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }}
                    buttonStyle={{ marginTop: 50 }}
                />
            </View>
            <View style={styles.alreadyAccount}>
                <CsText type={ECSTextTypes.Small} style={styles.alreadyAccountText}>Already have an account? </CsText>
                <Pressable onPress={() => navigation.navigate('login')}><CsText type={ECSTextTypes.Small} style={[styles.alreadyAccountText, { color: Colors.accent1000 }]}>Login</CsText></Pressable>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },
    methodsContainer: {

    },
    alreadyAccount: {
        flexDirection: "row",
        marginTop: 25
    },
    alreadyAccountText: {
        color: Colors.primary500
    }
})