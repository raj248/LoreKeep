import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Image } from 'expo-image';

import { RootStackParamList } from '../navigation';
import { Series } from "~/data/mockSeriesData";
import { StackNavigationProp } from "@react-navigation/stack";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function Detail() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const router = useRoute<DetailsScreenRouteProp>();
  const { series } = router.params; // Get series data from navigation

  const handleDelete = async () => {
    Alert.alert("Confirm", "Are you sure you want to delete this series?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const savedSeries = await AsyncStorage.getItem("seriesList");
            let seriesList = savedSeries ? JSON.parse(savedSeries) : [];
            seriesList = seriesList.filter((item: Series) => item.id !== series.id);
            await AsyncStorage.setItem("seriesList", JSON.stringify(seriesList));
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Failed to delete series.");
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Cover Image */}
      <Image source={{ uri: series.coverImage }} className="w-full h-60 rounded-lg mb-4" />

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
