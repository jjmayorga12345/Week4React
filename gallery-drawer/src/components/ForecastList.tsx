import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { DailyForecast } from '../weather/types';

type Props = { title: string; place: string; days: DailyForecast[] };

export default function ForecastList({ title, place, days }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title} for {place}</Text>
      <FlatList
        data={days}
        keyExtractor={(it) => it.date}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cellDate}>{new Date(item.date).toLocaleDateString(undefined, { weekday: 'long' })}</Text>
            <Text style={styles.cellTemp}>{Math.round(item.maxF)}°F | {Math.round(item.minF)}°F</Text>
            <Text style={styles.cellText} numberOfLines={1}>{item.text}</Text>
            <Image source={{ uri: item.icon }} style={styles.icon} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  cellDate: { width: 100 },
  cellTemp: { width: 90, fontWeight: '600' },
  cellText: { flex: 1 },
  icon: { width: 28, height: 28 },
});
