import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { Series, useSeriesStore } from "store/store";
import { RootStackParamList } from "navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type EditSeriesRouteProp = RouteProp<RootStackParamList, "EditSeries">;
type EditSeriesNavigationProp = StackNavigationProp<RootStackParamList, "EditSeries">;
export default function EditSeries() {
  const navigation = useNavigation<EditSeriesNavigationProp>();
  const route = useRoute<EditSeriesRouteProp>();
  const { updateSeries } = useSeriesStore()
  const { series } = route.params; // Get series data from navigation

  const [title, setTitle] = useState(series.title);
  const [author, setAuthor] = useState(series.author);
  const [chaptersReleased, setChaptersReleased] = useState(series.chaptersReleased.toString());
  const [chaptersRead, setChaptersRead] = useState(series.chaptersRead.toString());
  const [volumesReleased, setVolumesReleased] = useState(series.volumesReleased?.toString() || "");
  const [volumesRead, setVolumesRead] = useState(series.volumesRead?.toString() || "");
  const [coverImage, setCoverImage] = useState(series.coverImage);
  const [website, setWebsite] = useState(series.website);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(series.type);
  const [items, setItems] = useState([
    { label: "Web Novel", value: "Web Novel" },
    { label: "Light Novel", value: "Light Novel" },
    { label: "Manga", value: "Manga" },
    { label: "Comic", value: "Comic" },
  ]);

  // Update the series in AsyncStorage
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty.");
      return;
    }

    const updatedSeries = {
      ...series,
      title,
      type,
      author,
      coverImage,
      chaptersReleased: parseInt(chaptersReleased) || 0,
      chaptersRead: parseInt(chaptersRead) || 0,
      volumesReleased: parseInt(volumesReleased) || 0,
      volumesRead: parseInt(volumesRead) || 0,
      website,
    };

    try {
      updateSeries(updatedSeries)
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save changes.");
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View>
        <Text className="text-white text-2xl font-bold mb-4">Edit Series</Text>
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Title" placeholderTextColor="#ccc" value={title} onChangeText={setTitle} />
        <DropDownPicker
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
          style={{ backgroundColor: "#333" }}
          dropDownContainerStyle={{ backgroundColor: "#444", marginBottom: 12 }}
          textStyle={{ color: "white" }}
        />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3 mt-3" placeholder="Author" placeholderTextColor="#ccc" value={author} onChangeText={setAuthor} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Chapters Released" placeholderTextColor="#ccc" keyboardType="numeric" value={chaptersReleased} onChangeText={setChaptersReleased} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Chapters Read" placeholderTextColor="#ccc" keyboardType="numeric" value={chaptersRead} onChangeText={setChaptersRead} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Volumes Released (Optional)" placeholderTextColor="#ccc" keyboardType="numeric" value={volumesReleased} onChangeText={setVolumesReleased} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Volumes Read (Optional)" placeholderTextColor="#ccc" keyboardType="numeric" value={volumesRead} onChangeText={setVolumesRead} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" multiline={true} placeholder="Cover Image" placeholderTextColor="#ccc" value={coverImage} onChangeText={setCoverImage} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" multiline={true} placeholder="Website Link" placeholderTextColor="#ccc" value={website} onChangeText={setWebsite} />

        <View className="flex-row justify-between mt-4">
          <TouchableOpacity className="flex-1 bg-gray-600 p-4 rounded-md items-center mr-2" onPress={() => navigation.goBack()}>
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-md items-center ml-2" onPress={handleSave}>
            <Text className="text-white font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

