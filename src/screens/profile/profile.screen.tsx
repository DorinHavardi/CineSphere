import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { CsButton, CsText } from '../../components'
import { ECSTextTypes } from '../../enums/ECSTextTypes'
import { signOut } from '../../utils/firebase.util'
import { setUser } from '../../store/reducers/auth.slice'

const Profile: FC = () => {
    const { user } = useAppSelector(state => state.auth)
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    console.log("user: ", user)
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
            <CsText type={ECSTextTypes.Small}>{t('profile.title', { username: user?.firstName })}</CsText>
            <CsButton text={t('profile.logout')}
                onPress={() => {
                    dispatch(setUser(null))
                    signOut()
                }} />
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})