import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useWeather } from '../weather/useWeather';

const PLACE = 'West Warwick, RI';

export default function CurrentWeatherScreen() {
  const { data, loading, error, reload } = useWeather({ q: PLACE, days: 1 });

  useFocusEffect(React.useCallback(() => { reload(); }, [reload]));

  if (loading || !data) return <View style={styles.center}><ActivityIndicator /></View>;
  if (error) return <View style={styles.center}><Text>{error}</Text></View>;

  const c = data.current;
  const location = `${c.locationName}, ${c.region}`;

  return (
    <View style={styles.container}>
      <Text style={styles.place}>{location}</Text>
      <Image source={{ uri: c.condition.icon }} style={styles.bigIcon} />
      <Text style={styles.desc}>{c.condition.text}</Text>
      <Text style={styles.temp}>{Math.round(c.tempF)}°</Text>
      <Text style={styles.feels}>Feels like: {Math.round(c.feelsLikeF)}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 30 },
  place: { fontSize: 22, fontWeight: '700', marginBottom: 14 },
  bigIcon: { width: 120, height: 120, marginBottom: 10 },
  desc: { fontSize: 18, marginBottom: 6 },
  temp: { fontSize: 56, fontWeight: '800', marginBottom: 4 },
  feels: { color: '#666' },
});
