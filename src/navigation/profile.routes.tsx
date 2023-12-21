import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EProfileStackRoutes } from '../enums/EProfileStackRoutes';
import { CsHeader } from '../components';
import { FavoritesScreen, ProfileScreen } from '../screens';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={EProfileStackRoutes.MyProfile}>
            <Stack.Screen
                name={EProfileStackRoutes.MyProfile}
                component={ProfileScreen}
                options={{
                    header: () => <CsHeader currentItem={null} canGoBack={false} />,
                    headerShown: true
                }}
            />
            <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
                <Stack.Screen
                    name={EProfileStackRoutes.MyFavorites}
                    component={FavoritesScreen}
                    options={{
                        header: () => <CsHeader currentItem={null} canGoBack={true} showFavorite={false} />,
                        headerShown: true
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>

    )
}

export default ProfileRoutes

const styles = StyleSheet.create({})