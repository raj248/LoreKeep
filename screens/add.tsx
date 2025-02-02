import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import uuid from "react-native-uuid";

export default function AddSeries() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [chaptersReleased, setChaptersReleased] = useState("");
  const [chaptersRead, setChaptersRead] = useState("");
  const [volumesReleased, setVolumesReleased] = useState("");
  const [volumesRead, setVolumesRead] = useState("");
  const [website, setWebsite] = useState("");

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Web Novel");
  const [items, setItems] = useState([
    { label: "Web Novel", value: "Web Novel" },
    { label: "Light Novel", value: "Light Novel" },
    { label: "Manga", value: "Manga" },
    { label: "Comic", value: "Comic" },
  ]);
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return
    }

    const newSeries = {
      id: uuid.v4(),
      title,
      type,
      author,
      coverImage: coverImage || "https://picsum.photos/seed/picsum/200/300",
      chaptersReleased: Number(chaptersReleased) || 0,
      chaptersRead: Number(chaptersRead) || 0,
      volumesReleased: Number(volumesReleased) || 0,
      volumesRead: Number(volumesRead) || 0,
      website,
    };

    try {
      const savedSeries = await AsyncStorage.getItem("seriesList");
      const seriesList = savedSeries ? JSON.parse(savedSeries) : [];
      seriesList.push(newSeries);
      await AsyncStorage.setItem("seriesList", JSON.stringify(seriesList));
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save series");
    }
  };
  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View>
        <Text className="text-white text-2xl font-bold mb-4">Add New Series</Text>

        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Title" placeholderTextColor="#ccc" value={title} onChangeText={setTitle} />

        <DropDownPicker
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
          style={{ backgroundColor: "#333", marginBottom: 12 }}
          dropDownContainerStyle={{ backgroundColor: "#444" }}
          textStyle={{ color: "white" }}
        />

        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Author" placeholderTextColor="#ccc" value={author} onChangeText={setAuthor} />

        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Image Link" placeholderTextColor="#ccc" value={coverImage} onChangeText={setCoverImage} />

        <TouchableOpacity className="bg-gray-700 p-3 rounded-md mb-3 items-center">
          <Text className="text-white">Upload Cover Image</Text>
        </TouchableOpacity>

        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Chapters Released" placeholderTextColor="#ccc" keyboardType="numeric" value={chaptersReleased} onChangeText={setChaptersReleased} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Chapters Read" placeholderTextColor="#ccc" keyboardType="numeric" value={chaptersRead} onChangeText={setChaptersRead} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Volumes Released (Optional)" placeholderTextColor="#ccc" keyboardType="numeric" value={volumesReleased} onChangeText={setVolumesReleased} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Volumes Read (Optional)" placeholderTextColor="#ccc" keyboardType="numeric" value={volumesRead} onChangeText={setVolumesRead} />
        <TextInput className="bg-gray-800 text-white p-3 rounded-md mb-3" placeholder="Website Link" placeholderTextColor="#ccc" value={website} onChangeText={setWebsite} />

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