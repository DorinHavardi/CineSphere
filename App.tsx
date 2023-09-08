import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainLayout from './src/theme/mainLayout.cmp';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack.routes';

const App: FC = () => {

  return (
    <NavigationContainer>
      <MainLayout>
        <SafeAreaView style={{ flex: 1 }}>
          <StackNavigator />
        </SafeAreaView>
      </MainLayout>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
