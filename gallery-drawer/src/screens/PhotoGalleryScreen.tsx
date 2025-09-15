import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import { FontAwesome } from '@expo/vector-icons';

type GalleryNavProp = StackNavigationProp<StackParamList, 'PhotoGallery'>;

interface ImageData {
  id: number;
  url: string;
}

export default function PhotoGalleryScreen() {
  const navigation = useNavigation<GalleryNavProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const imageData: ImageData[] = [];
  for (let i = 1; i <= 70; i++) {
    imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
  }

  const filteredData = imageData.filter((item) =>
    item.id.toString().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PhotoDetail', {
                id: item.id,
                url: item.url.replace('/200', '/600'),
              })
            }
          >
            <Image source={{ uri: item.url }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 8,
  },
  searchIcon: { marginRight: 8, color: '#888' },
  searchInput: { flex: 1, height: 40 },
  image: { width: 120, height: 120, margin: 5, borderRadius: 8 },
});
