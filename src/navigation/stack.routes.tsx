import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EMainStackNavigator } from '../enums/EMainStackNavigator';
import Login from '../screens/login.screen';
import Register from '../screens/register.screen';

const Stack = createNativeStackNavigator();

const StackNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={EMainStackNavigator.Login}
                options={{ headerShown: false }}
                component={Login}
            />
            <Stack.Screen
                name={EMainStackNavigator.Register}
                options={{ headerShown: false }}
                component={Register}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})