
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { SCREEN_HEIGHT, getFontSizeByWindowWidth } from '../utils/window.util';
import MoviesRoutes from './movies.routes';
import { useAppSelector } from '../store/store';
import { ETabNavigator } from '../enums/ETabNavigator';
import Profile from '../screens/profile/profile.screen';
import { CsText } from '../components';
import { ECSTextTypes } from '../enums/ECSTextTypes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { t } = useTranslation();
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
                    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faHouse} size={25} style={{ color: focused ? Colors.contrast : Colors.accent1000 }} />),
                    tabBarLabel: ({ focused }) => (<CsText type={ECSTextTypes.Smaller} style={[styles.tabBarLabel, { color: focused ? Colors.contrast : Colors.accent1000, fontFamily: focused ? Fonts.Poppins_Bold : Fonts.Poppins_Regular }]}> {t('tabs.movies')}</CsText>),
                }}
            />
            <Tab.Screen
                name={ETabNavigator.Profile}
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faUser} size={25} style={{ color: focused ? Colors.contrast : Colors.accent1000 }} />),
                    tabBarLabel: ({ focused }) => (<CsText type={ECSTextTypes.Smaller} style={[styles.tabBarLabel, { color: focused ? Colors.contrast : Colors.accent1000, fontFamily: focused ? Fonts.Poppins_Bold : Fonts.Poppins_Regular }]}> {t('tabs.profile')}</CsText>)
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
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        shadowColor: Colors.black
    },
    tabBarLabel: {
        fontSize: getFontSizeByWindowWidth(16),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.accent1000,
        marginBottom: 7,
    }
})