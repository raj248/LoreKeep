import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Image } from 'expo-image';

import { useSeriesStore } from "store/SeriesStore";

import { RootStackParamList } from '../navigation';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function Detail() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const router = useRoute<DetailsScreenRouteProp>();
  const { series } = router.params; // Get series data from navigation
  const { deleteSeries } = useSeriesStore();
  const handleDelete = async () => {
    Alert.alert("Confirm", "Are you sure you want to delete this series?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            deleteSeries(series.id);
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Failed to delete series.");
          }
        },
      },
    ]);
  };
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Cover Image */}
      <Image source={series.coverImage}
        style={{ width: "100%", height: 300, borderRadius: 10 }}
        contentFit="contain"
        className="mb-4"
        placeholder={{ blurhash }}

      />
      {/* Series Title */}
      <Text className="text-white text-2xl font-bold mb-2">{series.title}</Text>
      <Text className="text-gray-400 text-lg mb-2">{series.type}</Text>

      {/* Author & Website */}
      <Text className="text-gray-300 text-md mb-1">Author: {series.author}</Text>
      {series.website ? (
        <Text className="text-blue-400 text-md mb-3">{series.website}</Text>
      ) : null}

      {/* Chapters & Volumes */}
      <Text className="text-gray-300 text-md">Chapters Read: {series.chaptersRead}/{series.chaptersReleased}</Text>
      <Text className="text-gray-300 text-md">Volumes Read: {series.volumesRead}/{series.volumesReleased}</Text>

      {/* Buttons */}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity className="flex-1 bg-gray-600 p-4 rounded-md items-center mr-2" onPress={() => navigation.goBack()}>
          <Text className="text-white">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-md items-center mx-2" onPress={() => navigation.navigate("EditSeries", { series })}>
          <Text className="text-white font-bold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-red-600 p-4 rounded-md items-center ml-2" onPress={handleDelete}>
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
