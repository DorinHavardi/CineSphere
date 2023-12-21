import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { CsButton, CsInput } from '../../components';
import { signOut } from '../../utils/firebase.util';
import { setUser } from '../../store/reducers/auth.slice';
import { SCREEN_HEIGHT } from '../../utils/window.util';
import { Colors } from '../../theme/colors';

const Profile: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const { photoURL, email, displayName, firstName, lastName } = user!;

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
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={{ backgroundColor: Colors.primary1000 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    {photoURL && <Image source={{ uri: photoURL }} style={styles.image} />}
                    <CsInput
                        placeholder={t('placeholders.email')}
                        value={email}
                        editable={false}
                    />
                    <CsInput
                        placeholder={t('placeholders.first_name')}
                        onChangeText={(value: string) => setNewFirstName(value)}
                        value={newFirstName}
                    />
                    <CsInput
                        placeholder={t('placeholders.last_name')}
                        onChangeText={(value: string) => setNewLastName(value)}
                        value={newLastName}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <CsButton
                        text={t('profile.save')}
                        buttonStyle={styles.logOutBtn}
                        onPress={() => {
                        }}
                    />
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
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT,
        padding: 15,
        alignItems: 'center',
        backgroundColor: Colors.primary1000,
    },
    content: {
        marginTop: "10%",
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
        bottom: "18%",
    },
    logOutBtn: {
        marginTop: 25,
    },
});
