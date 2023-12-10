import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ETVShowsStackRoutes } from '../enums/ETVShowsStackRoutes';
import { CsLogo } from '../components';
import TvShowsMain from '../screens/tvShows/main.screen';
import SingleTVShow from '../screens/tvShows/tvShow.screen';

const Stack = createNativeStackNavigator();

const TVShowsRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={ETVShowsStackRoutes.Main}>
            <Stack.Screen
                name={ETVShowsStackRoutes.Main}
                options={{
                    header: () => <CsLogo />
                }}
                component={TvShowsMain}
            />
            <Stack.Screen
                name={ETVShowsStackRoutes.SingleTVShow}
                options={{ headerShown: false }}
                component={SingleTVShow} />
        </Stack.Navigator>

    )
}

export default TVShowsRoutes

const styles = StyleSheet.create({})