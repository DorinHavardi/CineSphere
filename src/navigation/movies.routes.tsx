import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EMovieStackRoutes } from '../enums/EMovieStackRoutes';
import Main from '../screens/movies/main.screen';
import SingleMovie from '../screens/movies/movie.screen';
import { CsLogo } from '../components';
import Header from '../components/header.cmp';

const Stack = createNativeStackNavigator();

const MoviesRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={EMovieStackRoutes.Main}>
            <Stack.Screen
                name={EMovieStackRoutes.Main}
                options={{
                    header: () => <CsLogo />
                }}
                component={Main}
            />
            <Stack.Screen
                name={EMovieStackRoutes.SingleMovie}
                options={{
                    // headerShown: false,
                    header: () => <Header />
                }}
                component={SingleMovie} />
        </Stack.Navigator>

    )
}

export default MoviesRoutes

const styles = StyleSheet.create({})