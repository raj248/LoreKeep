import React, { useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { mockSeriesData, Series } from '~/data/mockSeriesData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;
export default function Home() {
  const [seriesList, setSeriesList] = React.useState<Series[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const isFocused = useIsFocused();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    const loadSeries = async () => {
      const savedSeries = await AsyncStorage.getItem('seriesList');
      if (savedSeries) {
        setSeriesList(JSON.parse(savedSeries));
      }
    }
    if (isFocused) {
      loadSeries();
      // console.log("inFocus");
    }
    // console.log("outFocus");

  }, [isFocused])

  const renderItem = ({ item }: { item: Series }) => (
    <TouchableOpacity className="flex-row items-center bg-gray-800 p-3 rounded-md mb-3"
      onPress={() => navigation.navigate("Details", { series: item })}
    // activeOpacity={0.7}
    >
      <Image source={item.coverImage}
        style={{ width: 80, height: 100, borderRadius: 10 }}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
        className="w-16 h-24 rounded-md" />
      <View className="ml-4 flex-1">
        <Text className="text-white font-bold text-lg">{item.title}</Text>
        <Text className="text-gray-400 text-sm">{item.type}</Text>
        <Text className="text-gray-300 text-sm">
          Chapters Read: {item.chaptersRead}/{item.chaptersReleased}
        </Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-center text-white text-2xl font-bold mb-4">LoreKeep</Text>
      <FlatList
        data={seriesList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
        onPress={() => { navigation.navigate("AddSeries") }}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

