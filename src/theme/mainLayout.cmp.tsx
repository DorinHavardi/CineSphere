import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from './colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/window.util';

interface IMainLayout {
  children: ReactNode;
}
const MainLayout: FC<IMainLayout> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default MainLayout

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary1000,
    fontWeight: 'bold',
    flex: 1,
    padding: 20,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
})