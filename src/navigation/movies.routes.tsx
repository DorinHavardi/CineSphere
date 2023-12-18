import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EMovieStackRoutes } from '../enums/EMovieStackRoutes';
import Main from '../screens/movies/main.screen';
import SingleMovie from '../screens/movies/movie.screen';
import { CsHeader, CsLogo } from '../components';

const Stack = createNativeStackNavigator();

const MoviesRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={EMovieStackRoutes.Main}>
            <Stack.Screen
                name={EMovieStackRoutes.Main}
                component={Main}
                options={{
                    header: () => <CsLogo />
                }}
            />
            <Stack.Screen
                name={EMovieStackRoutes.SingleMovie}
                component={SingleMovie}
                options={{
                    header: () => <CsHeader />
                }}
            />
        </Stack.Navigator>

    )
}

export default MoviesRoutes

const styles = StyleSheet.create({})