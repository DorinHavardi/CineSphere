import { Image, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { CsButton, CsInput } from '../../components';
import { signOut } from '../../utils/firebase.util';
import { setUser } from '../../store/reducers/auth.slice';

const Profile: FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const { photoURL, displayName, firstName, lastName } = user!;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [newFirstName, setNewFirstName] = useState<string | null>(
        firstName || null,
    );
    const [newLastName, setNewLastName] = useState<string | null>(
        lastName || null,
    );

    useEffect(() => {
        if (displayName) {
            setNewFirstName(displayName.split(" ")[0])
            setNewLastName(displayName.split(" ")[1])
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: photoURL }} style={styles.image} />
            <CsInput
                placeholder={t('placeholdersfirst_name')}
                onChangeText={(value: string) => setNewFirstName(value)}
                value={newFirstName}
            />
            <CsInput
                placeholder={t('placeholderslast_name')}
                onChangeText={(value: string) => setNewLastName(value)}
                value={newLastName}
            />
            <CsButton
                text={t('profile.save')}
                buttonStyle={styles.logOutBtn}
                onPress={() => {
                }}
            />
            <View style={styles.buttonsContainer}>
                <CsButton
                    outlined
                    text={t('profile.logout')}
                    buttonStyle={styles.logOutBtn}
                    onPress={() => {
                        dispatch(setUser(null));
                        signOut();
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 25,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 50,
    },
    logOutBtn: {
        marginTop: 25,
    },
});
