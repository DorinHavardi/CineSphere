import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthStackParamsList } from '../../navigation/types/AuthStackParamsList';
import { CsButton, CsInput, CsText } from '../../components';
import { Colors } from '../../theme/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/window.util';
import { useAppDispatch } from '../../store/store';
import { ECSTextTypes } from '../../enums/ECSTextTypes';
import { EAuthStackNavigator } from '../../enums/EAuthStackNavigator';
import { signUpWithEmailPassword } from '../../utils/firebase.util';
import { setUser } from '../../store/reducers/auth.slice';
import { EMovieStackRoutes } from '../../enums/EMovieStackRoutes';
import { MoviesStackParamsList } from '../../navigation/types/MoviesStackParamsList';


const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamsList | MoviesStackParamsList>>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t('errors.required'))
            .email(t('errors.invalidEmail')),
        firstName: Yup.string()
            .required(t('errors.required'))
            .min(2, t('errors.minLength', { min: 2 })),
        lastName: Yup.string()
            .required(t('errors.required'))
            .min(2, t('errors.minLength', { min: 2 })),
        password: Yup.string()
            .min(6, t('errors.minLength', { min: 6 }))
            .required(t('errors.required')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('errors.passwordMatch'))
            .required(t('errors.required')),

    })

    return (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    if (values.password === values.confirmPassword) {
                        signUpWithEmailPassword(values.email, values.password, values.firstName, values.lastName)
                            .then((user) => {
                                dispatch(setUser(user!));
                                navigation.navigate(EMovieStackRoutes.Main as never); // TODO: FIX NAVIGATION
                            })
                            .catch(error => {
                                Alert.alert(error);
                            });
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.container}>
                        <CsText type={ECSTextTypes.Biggest}>{t('title')}</CsText>
                        <CsText type={ECSTextTypes.Bigger} style={{ marginBottom: 20 }}>{t("register.title")}</CsText>
                        <View style={styles.inputsContainer}>
                            <CsInput
                                placeholder={t('placeholders.email')}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                isError={touched.email}
                                errorText={errors.email}
                            />
                            <CsInput
                                placeholder={t('placeholders.first_name')}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                isError={touched.firstName}
                                errorText={errors.firstName}
                            />
                            <CsInput
                                placeholder={t('placeholders.last_name')}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                isError={touched.lastName}
                                errorText={errors.lastName}
                            />
                            <CsInput
                                placeholder={t('placeholders.password')}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isError={touched.password}
                                errorText={errors.password}
                                secureTextEntry
                            />
                            <CsInput
                                placeholder={t('placeholders.confirm_password')}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                isError={touched.confirmPassword}
                                errorText={errors.confirmPassword}
                                secureTextEntry
                            />
                            <CsButton
                                text={t("register.title")}
                                buttonStyle={{ marginTop: 25 }}
                                onPress={handleSubmit}
                            />
                        </View>
                        <View style={styles.alreadyAccount}>
                            <CsText type={ECSTextTypes.Small} style={styles.alreadyAccountText}>{t('register.already_have_an_account')}</CsText>
                            <Pressable onPress={() => navigation.navigate(EAuthStackNavigator.Login as never)}>
                                <CsText type={ECSTextTypes.Small} style={[styles.alreadyAccountText, { color: Colors.accent1000 }]}>
                                    {t('login.title')}
                                </CsText>
                            </Pressable>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.primary1000,
        width: SCREEN_WIDTH,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SCREEN_HEIGHT / 10,
        backgroundColor: Colors.primary1000,
    },
    inputsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        maxWidth: SCREEN_WIDTH - 100,
    },
    alreadyAccount: {
        flexDirection: "row",
        marginVertical: 25
    },
    alreadyAccountText: {
        color: Colors.primary500
    },

})