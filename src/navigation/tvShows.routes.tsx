import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ETVShowsStackRoutes } from '../enums/ETVShowsStackRoutes';
import { CsHeader, CsLogo } from '../components';
import TvShowsMain from '../screens/tvShows/main.screen';
import SingleTVShow from '../screens/tvShows/tvShow.screen';
import { useAppSelector } from '../store/store';

const Stack = createNativeStackNavigator();

const TVShowsRoutes = () => {
    const { selectedTvShow } = useAppSelector(state => state.tvShows)
    return (
        <Stack.Navigator initialRouteName={ETVShowsStackRoutes.Main}>
            <Stack.Screen
                name={ETVShowsStackRoutes.Main}
                component={TvShowsMain}
                options={{
                    header: () => <CsLogo />
                }}
            />
            <Stack.Screen
                name={ETVShowsStackRoutes.SingleTVShow}
                component={SingleTVShow}
                options={{
                    header: () => <CsHeader currentItem={selectedTvShow!} />
                }}
            />
        </Stack.Navigator>

    )
}

export default TVShowsRoutes

const styles = StyleSheet.create({})