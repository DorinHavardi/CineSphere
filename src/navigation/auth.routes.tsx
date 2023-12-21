import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EAuthStackNavigator } from '../enums/EAuthStackNavigator';
import { LoginScreen, RegisterScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStackNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={EAuthStackNavigator.Login}
                options={{ headerShown: false }}
                component={LoginScreen}
            />
            <Stack.Screen
                name={EAuthStackNavigator.Register}
                options={{ headerShown: false }}
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})