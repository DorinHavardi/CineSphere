import React, { FC, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import MainLayout from './src/theme/mainLayout.cmp';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, useAppSelector } from './src/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from './src/translations/i18n';
import { CsLoader } from './src/components';
import { AuthStackNavigator, TabNavigator } from './src/navigation';

export const MainApp: FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { isLoading } = useAppSelector(state => state.system);

  useEffect(() => {
  }, [user])

  return (
    <MainLayout>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        {user! && user!.email ? <TabNavigator /> : <AuthStackNavigator />}
        {isLoading ? <CsLoader /> : null}
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

export default App;
