import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainLayout from './src/theme/mainLayout.cmp';
import Login from './src/screens/login.screen';

const App = () => {

  return (
    <MainLayout>
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({

});

export default App;
