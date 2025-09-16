import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import ForecastList from '../components/ForecastList';
import { useWeather } from '../weather/useWeather';

const PLACE = 'West Warwick, RI';

type TabParams = {
  ForecastX: { daysToShow: number };
  ForecastXSeven: { daysToShow: number };
};

const Tab = createBottomTabNavigator<TabParams>();

function ForecastTabScreen({ route }: { route: { params?: { daysToShow?: number } } }) {
  const count = route.params?.daysToShow ?? 5;
  const { data, loading, error, reload } = useWeather({ q: PLACE, days: Math.max(7, count) });

  useFocusEffect(React.useCallback(() => { reload(); }, [reload]));

  if (loading || !data) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const place = `${data.current.locationName}, ${data.current.region}`;
  const slice = data.days.slice(0, count);

  return <ForecastList title="Forecast" place={place} days={slice} />;
}

export default function ForecastTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'purple' }}>
      <Tab.Screen
        name="ForecastX"
        component={ForecastTabScreen}
        initialParams={{ daysToShow: 5 }}
        options={{ title: 'Five Day' }}
      />
      <Tab.Screen
        name="ForecastXSeven"
        component={ForecastTabScreen}
        initialParams={{ daysToShow: 7 }}
        options={{ title: 'Seven Day' }}
      />
    </Tab.Navigator>
  );
}
