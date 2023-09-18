
import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/main.screen';
import { Colors } from '../theme/colors';
import { getFontSizeByWindowWidth } from '../utils/window.util';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarContainer
            }}
        >
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarLabelStyle: styles.tabBarLabel,
                    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faHouse} size={25} style={{ color: focused ? Colors.contrast : Colors.accent1000 }} />),
                }}
            />
        </Tab.Navigator>

    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: Colors.primary400,
        borderTopColor: "transparent",
        height: 65,
    },
    tabBarLabel: {
        fontSize: getFontSizeByWindowWidth(18),
        color: Colors.accent1000
    }
})