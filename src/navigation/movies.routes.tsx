import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EMovieStackRoutes } from '../enums/EMovieStackRoutes';
import { CsHeader, CsLogo } from '../components';
import { useAppSelector } from '../store/store';
import { MovieScreen, MoviesScreen } from '../screens';

const Stack = createNativeStackNavigator();

const MoviesRoutes = () => {
    const { selectedMovie } = useAppSelector(state => state.movies)

    return (
        <Stack.Navigator initialRouteName={EMovieStackRoutes.Main}>
            <Stack.Screen
                name={EMovieStackRoutes.Main}
                component={MoviesScreen}
                options={{
                    header: () => <CsLogo />
                }}
            />
            <Stack.Screen
                name={EMovieStackRoutes.SingleMovie}
                component={MovieScreen}
                options={{
                    header: () => <CsHeader currentItem={selectedMovie!} />
                }}
            />
        </Stack.Navigator>

    )
}

export default MoviesRoutes

const styles = StyleSheet.create({})