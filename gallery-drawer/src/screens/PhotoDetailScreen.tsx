import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';

type DetailNavProp = StackNavigationProp<StackParamList, 'PhotoDetail'>;
type DetailRouteProp = RouteProp<StackParamList, 'PhotoDetail'>;

export default function PhotoDetailScreen() {
  const navigation = useNavigation<DetailNavProp>();
  const route = useRoute<DetailRouteProp>();

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.url }} style={styles.image} />
      <Button
        title="Open Fullscreen Modal"
        onPress={() =>
          navigation.navigate('PhotoModal', { url: route.params.url })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 300, height: 300, borderRadius: 8 },
});
