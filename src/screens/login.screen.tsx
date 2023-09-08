import React, { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { CsButton, CsInput, CsSocialConnect, CsText } from '../components'
import { ECSTextTypes } from '../components/text.cmp'
import { Colors } from '../theme/colors'
import { ESocialConnectButtonTypes } from '../components/socialButton.cmp'
import { useNavigation } from '@react-navigation/native'

const Login: FC = ({ }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>CineSphere</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>Login</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder='Email' />
                <CsInput placeholder='Password' secureTextEntry />
                <CsButton text="Login" buttonStyle={{ marginTop: 50 }} />
                <View style={styles.socialConnectContainer}>
                    <CsSocialConnect type={ESocialConnectButtonTypes.Facebook} />
                    <CsSocialConnect type={ESocialConnectButtonTypes.Google} />
                    <CsSocialConnect type={ESocialConnectButtonTypes.Apple} />
                </View>
            </View>
            <View style={styles.noAccount}>
                <CsText type={ECSTextTypes.Small} style={styles.noAccountText}>Dont have an account? </CsText>
                <Pressable onPress={() => navigation.navigate('register')}><CsText type={ECSTextTypes.Small} style={styles.noAccountText}>Press here</CsText></Pressable>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: Colors.primary1000,
        // width: "100%"

    },
    methodsContainer: {

    },
    socialConnectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
    },
    noAccount: {
        flexDirection: "row",
        width: "100%",
        justifyContent: 'center',
    },
    noAccountText: {
        // color: Colors.primary500
    }
})