
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faClapperboard, faTv } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { SCREEN_HEIGHT, getFontSizeByWindowWidth } from '../utils/window.util';
import MoviesRoutes from './movies.routes';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ETabNavigator } from '../enums/ETabNavigator';
import { CsText } from '../components';
import { ECSTextTypes } from '../enums/ECSTextTypes';
import TVShowsRoutes from './tvShows.routes';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProfileRoutes from './profile.routes';
import { getFavoritesFromFirebase } from '../utils/firebase.util';
import { setFavorites } from '../store/reducers/auth.slice';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isTabBarVisible } = useAppSelector((state) => state.system)
    const { id: userId, favorites } = useAppSelector(state => state.auth.user!)

    useEffect(() => {
        getFavoritesFromFirebase(userId!)
            .then(fetchedFavorites => dispatch(setFavorites(fetchedFavorites)))
            .catch(error => console.error('Error fetching favorites:', error));
    }, [userId, favorites]);

    const createTabOptions = (icon: IconProp, labelKey: string) => ({
        headerShown: false,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
            <FontAwesomeIcon
                icon={icon}
                size={25}
                style={{ color: focused ? Colors.contrast : Colors.accent1000 }}
            />
        ),
        tabBarLabel: ({ focused }: { focused: boolean }) => (
            <CsText
                type={ECSTextTypes.Smallest}
                style={[
                    styles.tabBarLabel,
                    {
                        color: focused ? Colors.contrast : Colors.accent1000,
                        fontFamily: focused ? Fonts.Poppins_Bold : Fonts.Poppins_Regular,
                    },
                ]}
            >
                {t(`tabs.${labelKey}`)}
            </CsText>
        ),
    });

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
                options={createTabOptions(faClapperboard, 'movies')}
            />
            <Tab.Screen
                name={ETabNavigator.TVShowsRoutes}
                component={TVShowsRoutes}
                options={createTabOptions(faTv, 'tvShows')}
            />
            <Tab.Screen
                name={ETabNavigator.Profile}
                component={ProfileRoutes}
                options={createTabOptions(faUser, 'profile')}
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
        fontSize: getFontSizeByWindowWidth(15),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.accent1000,
    }
})