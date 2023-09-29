import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/main.screen';
import SingleMovie from '../screens/movie.screen';
const Stack = createNativeStackNavigator();

const MoviesRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="main"
                options={{ headerShown: false }}
                component={Main} />
            <Stack.Screen
                name="singleMovie"
                options={{ headerShown: false }}
                component={SingleMovie} />
        </Stack.Navigator>

    )
}

export default MoviesRoutes

const styles = StyleSheet.create({})