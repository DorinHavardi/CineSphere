import React, { FC, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import MainLayout from './src/theme/mainLayout.cmp';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack.routes';
import { Provider } from 'react-redux';
import TabNavigator from './src/navigation/tab.routes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, useAppSelector } from './src/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from './src/translations/i18n';

export const MainApp: FC = () => {
  const { user } = useAppSelector(state => state.auth);

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
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

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

const styles = StyleSheet.create({});

export default App;
