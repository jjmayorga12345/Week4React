import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather app</Text>
      <Text style={styles.sub}>Homework area — clearly labeled and separated.</Text>
      <Text style={styles.hint}>Swipe from the RIGHT edge to open the hidden drawer.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  sub: { marginTop: 8, color: '#666' },
  hint: { marginTop: 16, color: '#999', fontSize: 12, textAlign: 'center' },
});
