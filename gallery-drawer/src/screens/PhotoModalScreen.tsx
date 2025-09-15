import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../App';

type ModalRouteProp = RouteProp<StackParamList, 'PhotoModal'>;

export default function PhotoModalScreen() {
  const route = useRoute<ModalRouteProp>();

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.url }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '90%', height: '80%', resizeMode: 'contain' },
});
