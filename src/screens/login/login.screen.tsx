import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CsButton, CsInput, CsSocialConnect, CsText } from '../../components';
import { Colors } from '../../theme/colors';
import { signInWithEmailPassword, signInWithGoogle } from '../../utils/firebase.util';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import { ECSTextTypes } from '../../enums/ECSTextTypes';
import { ESocialConnectButtonTypes } from '../../enums/ESocialConnectButtonTypes';
import { EMainStackNavigator } from '../../enums/EMainStackNavigator';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setUser } from '../../store/reducers/auth.slice';

const Login: FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { user } = useAppSelector(state => state.auth)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>{t('title')}</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>{t("login.title")}</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder='Email' onChangeText={(value: string) => setEmail(value)} />
                <CsInput placeholder='Password' onChangeText={(value: string) => setPassword(value)} secureTextEntry />
                <CsButton text="Login" onPress={() => signInWithEmailPassword(email, password)} buttonStyle={{ marginTop: 50 }} />
                <View style={styles.socialConnectContainer}>
                    <CsText type={ECSTextTypes.Small} style={styles.noAccountText}>{t('login.socialLoginSubtitle')} </CsText>
                    <View style={styles.socialButtonsContainer}>
                        {/* <CsSocialConnect type={ESocialConnectButtonTypes.Facebook} /> */}
                        <CsSocialConnect
                            onPress={() => {
                                signInWithGoogle().then(googleUser => {
                                    const userData = {
                                        email: googleUser?.user?.email,
                                        displayName: googleUser?.user?.displayName,
                                        photoURL: googleUser?.user?.photoURL,
                                        // ... any other relevant fields
                                    };
                                    dispatch(setUser(userData))
                                }).catch(error => {
                                    console.error("Google sign-in error: ", error)
                                })
                            }}
                            type={ESocialConnectButtonTypes.Google} />
                        {/* <CsSocialConnect type={ESocialConnectButtonTypes.Apple} /> */}
                    </View>
                </View>
            </View>
            <View style={styles.noAccount}>
                <CsText type={ECSTextTypes.Small} style={styles.noAccountText}> {t('login.dontHaveAnAccount')}</CsText>
                <Pressable onPress={() => navigation.navigate(EMainStackNavigator.Register)}>
                    <CsText type={ECSTextTypes.Small} style={[styles.noAccountText, { color: Colors.accent1000 }]}>
                        {t('register.title')}
                    </CsText>
                </Pressable>
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