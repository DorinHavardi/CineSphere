
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { SCREEN_HEIGHT, getFontSizeByWindowWidth } from '../utils/window.util';
import MoviesRoutes from './movies.routes';
import { useAppSelector } from '../store/store';
import { ETabNavigator } from '../enums/ETabNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { isTabBarVisible } = useAppSelector((state) => state.system)

    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: Colors.primary1000 }}
            screenOptions={{
                headerShown: false,
                tabBarStyle: [styles.tabBarContainer, { display: isTabBarVisible ? 'flex' : 'none' }]
            }}
        >
            <Tab.Screen
                name={ETabNavigator.MoviesRoutes}
                component={MoviesRoutes}
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
        height: SCREEN_HEIGHT / 9,
    },
    tabBarLabel: {
        fontSize: getFontSizeByWindowWidth(18),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.accent1000
    }
})