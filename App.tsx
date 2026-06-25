import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick &amp; Morty Explorer</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
