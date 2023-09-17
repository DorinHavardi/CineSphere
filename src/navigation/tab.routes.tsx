
import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/main.screen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false
                }}
            />
        </Tab.Navigator>

    )
}

export default TabNavigator

const styles = StyleSheet.create({})