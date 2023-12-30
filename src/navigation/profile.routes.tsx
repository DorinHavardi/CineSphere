import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EProfileStackRoutes } from '../enums/EProfileStackRoutes';
import { CsHeader } from '../components';
import { FavoritesScreen, MovieScreen, ProfileScreen, TvShowScreen } from '../screens';
import { ETVShowsStackRoutes } from '../enums/ETVShowsStackRoutes';
import { useAppDispatch, useAppSelector } from '../store/store';
import { EMovieStackRoutes } from '../enums/EMovieStackRoutes';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
    const dispatch = useAppDispatch();
    const { id: userId, favorites } = useAppSelector(state => state.auth.user!)
    const { selectedMovie } = useAppSelector(state => state.movies)
    const { selectedTvShow } = useAppSelector(state => state.tvShows)

    // useEffect(() => {
    //     getFavoritesFromFirebase(userId!)
    //         .then(fetchedFavorites => dispatch(setFavorites(fetchedFavorites)))
    //         .catch(error => console.error('Error fetching favorites:', error));
    // }, [userId, favorites]);

    return (
        <Stack.Navigator initialRouteName={EProfileStackRoutes.MyProfile}>
            <Stack.Screen
                name={EProfileStackRoutes.MyProfile}
                component={ProfileScreen}
                options={{
                    header: () => <CsHeader currentItem={null} canGoBack={false} showFavorite={false} isProfileScreen />,
                    headerShown: true
                }}
            />
            <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
                <Stack.Screen
                    name={EProfileStackRoutes.MyFavorites}
                    component={FavoritesScreen}
                    options={{
                        header: () => <CsHeader currentItem={null} canGoBack={true} showFavorite={false} />,
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name={EMovieStackRoutes.SingleMovie}
                    component={MovieScreen}
                    options={{
                        header: () => <CsHeader currentItem={selectedMovie!} />
                    }}
                />
                <Stack.Screen
                    name={ETVShowsStackRoutes.SingleTVShow}
                    component={TvShowScreen}
                    options={{
                        header: () => <CsHeader currentItem={selectedTvShow!} />
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>

    )
}

export default ProfileRoutes

const styles = StyleSheet.create({})