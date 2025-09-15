import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import PhotoGalleryScreen from './src/screens/PhotoGalleryScreen';
import PhotoDetailScreen from './src/screens/PhotoDetailScreen';
import PhotoModalScreen from './src/screens/PhotoModalScreen';
import WeatherHomeScreen from './src/screens/WeatherHomeScreen';

export type StackParamList = {
  PhotoGallery: undefined;
  PhotoDetail: { id: number; url: string };
  PhotoModal: { url: string };
};

const GalleryStack = createStackNavigator<StackParamList>();
function GalleryNavigator() {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen
        name="PhotoGallery"
        component={PhotoGalleryScreen}
        options={{ title: 'Photo Gallery' }}
      />
      <GalleryStack.Screen
        name="PhotoDetail"
        component={PhotoDetailScreen}
        options={{ title: 'Photo Detail' }}
      />
      <GalleryStack.Group screenOptions={{ presentation: 'modal' }}>
        <GalleryStack.Screen
          name="PhotoModal"
          component={PhotoModalScreen}
          options={{
            title: 'Photo',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerShadowVisible: false,
          }}
        />
      </GalleryStack.Group>
    </GalleryStack.Navigator>
  );
}

const WeatherStack = createStackNavigator();
function WeatherNavigator() {
  return (
    <WeatherStack.Navigator>
      <WeatherStack.Screen
        name="WeatherHome"
        component={WeatherHomeScreen}
        options={{ title: 'Weather app' }}
      />
    </WeatherStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerType: 'front',
          swipeEnabled: true,
          swipeEdgeWidth: 40,
          overlayColor: 'rgba(0,0,0,0.15)',
        }}
      >
        <Drawer.Screen
          name="Photo Gallery (class)"
          component={GalleryNavigator}
          options={{ drawerLabel: 'Photo Gallery (class)' }}
        />
        <Drawer.Screen
          name="Weather app (homework)"
          component={WeatherNavigator}
          options={{ drawerLabel: 'Weather app (homework)' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
