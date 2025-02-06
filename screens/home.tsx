import { View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from "@expo/vector-icons";
import { Series, useSeriesStore } from 'store/SeriesStore';
import { Image } from 'expo-image';
import { Surface, Text, useTheme } from 'react-native-paper';

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const { colors } = useTheme();
  const { seriesList, loadSeries } = useSeriesStore()
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    loadSeries();
  }, [])

  const renderItem = ({ item }: { item: Series }) => (
    <TouchableOpacity className="flex-row items-center p-3 rounded-md mb-3"
      onPress={() => navigation.navigate("Details", { series: item })}
    >
      <Image source={item.coverImage}
        style={{ width: 80, height: 100, borderRadius: 10 }}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
        className="w-16 h-24 rounded-md" />

      <View className="ml-4 flex-1">
        <Text className="font-bold text-lg">{item.title}</Text>
        <Text className="text-sm">{item.type}</Text>
        <Text className="text-sm">
          Chapters Read: {item.chaptersRead}/{item.chaptersReleased}
        </Text>
      </View>
    </TouchableOpacity>
  );


  const [searchQuery, setSearchQuery] = useState("");

  const filteredSeries = seriesList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <Text className="text-center text-2xl font-bold mb-4" style={{ color: colors.onBackground }}>LoreKeep</Text>
      <TextInput
        className="w-full p-3 rounded-md mb-3"
        style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
        placeholder="Search series..."
        placeholderTextColor={colors.onBackground}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {seriesList.length ? (<FlatList
        data={filteredSeries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />) : (
        <Surface className='flex-1 justify-center items-center' elevation={0}>
          < Text className="text-white text-center text-lg font-bold" style={{ color: colors.onSurface }}>No Series Found</Text>
        </Surface>
      )}

      <TouchableOpacity className="absolute bottom-6 right-6 p-4 rounded-full shadow-lg"
        style={{ backgroundColor: colors.tertiaryContainer }}
        onPress={() => { navigation.navigate("AddSeries") }}
      >
        <Feather name="plus" size={24} color={colors.onTertiaryContainer} />
      </TouchableOpacity>
    </View >
  )
}

