import React, { FC, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MainLayout from './src/theme/mainLayout.cmp';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack.routes';
import { Provider, useSelector } from 'react-redux';
import TabNavigator from './src/navigation/tab.routes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/store';

export const MainApp: FC = () => {
  const { user } = useSelector(state => state.auth);
  // console.log("user", user)
  useEffect(() => {
  }, [user])

  return (
    <MainLayout>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        {user ? <TabNavigator /> : <StackNavigator />}
      </SafeAreaView>
    </MainLayout>
  );
}

const App: FC = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainApp />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
