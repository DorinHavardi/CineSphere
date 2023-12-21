import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EProfileStackRoutes } from '../enums/EProfileStackRoutes';
import Profile from '../screens/profile/profile.screen';
import { CsHeader } from '../components';
import MyFavorites from '../screens/myFavorites/favorites.screen';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={EProfileStackRoutes.MyProfile}>
            <Stack.Screen
                name={EProfileStackRoutes.MyProfile}
                component={Profile}
                options={{
                    header: () => <CsHeader currentItem={null} canGoBack={false} />,
                    headerShown: true
                }}
            />
            <Stack.Screen
                name={EProfileStackRoutes.MyFavorites}
                component={MyFavorites}
                options={{
                    header: () => <CsHeader currentItem={null} canGoBack={true} showFavorite={false} />,
                    headerShown: true
                }}
            />
        </Stack.Navigator>

    )
}

export default ProfileRoutes

const styles = StyleSheet.create({})