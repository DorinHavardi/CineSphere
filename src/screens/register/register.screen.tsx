import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CsButton, CsInput, CsText } from '../../components';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import { Colors } from '../../theme/colors';
import { signUpWithEmailPassword } from '../../utils/firebase.util';
import { setUser } from '../../store/reducers/auth.slice';
import { useAppDispatch } from '../../store/store';
import { ECSTextTypes } from '../../enums/ECSTextTypes';
import { EMainStackNavigator } from '../../enums/EMainStackNavigator';

const Register = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    return (
        <View style={styles.container}>
            <CsText type={ECSTextTypes.Biggest}>{t('title')}</CsText>
            <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>{t("register.title")}</CsText>
            <View style={styles.methodsContainer}>
                <CsInput placeholder={t('placeholders.email')} onChangeText={(value: string) => setEmail(value)} />
                <CsInput placeholder={t('placeholders.firstName')} onChangeText={(value: string) => setFirstName(value)} />
                <CsInput placeholder={t('placeholders.lastName')} onChangeText={(value: string) => setLastName(value)} />
                <CsInput placeholder={t('placeholders.password')} onChangeText={(value: string) => setPassword(value)} secureTextEntry />
                <CsInput placeholder={t('placeholders.confirmPassword')} onChangeText={(value: string) => setConfirmPassword(value)} secureTextEntry />
                <CsButton
                    text={t("register.title")}
                    buttonStyle={{ marginTop: 50 }}
                    onPress={() => {
                        signUpWithEmailPassword(email, password, firstName, lastName)
                            .then((user) => {
                                dispatch(setUser(user))
                                // navigation.navigate('Main');
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }}
                />
            </View>
            <View style={styles.alreadyAccount}>
                <CsText type={ECSTextTypes.Small} style={styles.alreadyAccountText}>{t('register.alreadyHaveAnAccount')}</CsText>
                <Pressable onPress={() => navigation.navigate(EMainStackNavigator.Login)}>
                    <CsText type={ECSTextTypes.Small} style={[styles.alreadyAccountText, { color: Colors.accent1000 }]}>
                        {t('login.title')}
                    </CsText>
                </Pressable>
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