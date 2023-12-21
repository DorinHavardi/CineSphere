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
import { useAppDispatch } from '../../store/store';
import { setIsLoading } from '../../store/reducers/system.slice';
import { EAuthStackNavigator } from '../../enums/EAuthStackNavigator';
import { setUser } from '../../store/reducers/auth.slice';

const Login: FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
                    <CsText type={ECSTextTypes.Small} style={styles.noAccountText}>
                        {t('login.social_login_subtitle')}
                    </CsText>
                    <View style={styles.socialButtonsContainer}>
                        <CsSocialConnect
                            type={ESocialConnectButtonTypes.Google}
                            onPress={() => {
                                dispatch(setIsLoading(true));
                                signInWithGoogle()
                                    .then(googleUser => {
                                        const userData = {
                                            id: googleUser?.user?.uid,
                                            email: googleUser?.user?.email,
                                            displayName: googleUser?.user?.displayName,
                                            photoURL: googleUser?.user?.photoURL,
                                        };
                                        dispatch(setUser(userData))
                                    }).catch(error => console.error("Google sign-in error: ", error))
                                    .finally(() => dispatch(setIsLoading(false)))
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.noAccount}>
                <CsText type={ECSTextTypes.Small} style={styles.noAccountText}> {t('login.dont_have_an_account')}</CsText>
                <Pressable onPress={() => navigation.navigate(EAuthStackNavigator.Register as never)}>
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
        marginTop: 35,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    noAccount: {
        flexDirection: "row",
    },
    noAccountText: {
        color: Colors.primary500
    }
})