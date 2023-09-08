import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login.screen';
import Register from '../screens/register.screen';

const Stack = createNativeStackNavigator();

const StackNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                options={{ headerShown: false }}
                component={Login}
            />
            <Stack.Screen
                name="register"
                options={{ headerShown: false }}
                component={Register}
            />

        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})