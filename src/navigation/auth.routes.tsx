import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/login.screen';
import Register from '../screens/register/register.screen';
import { EAuthStackNavigator } from '../enums/EAuthStackNavigator';

const Stack = createNativeStackNavigator();

const AuthStackNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={EAuthStackNavigator.Login}
                options={{ headerShown: false }}
                component={Login}
            />
            <Stack.Screen
                name={EAuthStackNavigator.Register}
                options={{ headerShown: false }}
                component={Register}
            />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})