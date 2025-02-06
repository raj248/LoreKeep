import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import uuid from "react-native-uuid";
import { useSeriesStore } from "store/SeriesStore";
import { useTheme, Button, Surface, Text } from "react-native-paper";

export default function AddSeries() {
  const { colors } = useTheme();
  const { addSeries } = useSeriesStore();
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
      coverImage: coverImage,
      chaptersReleased: Number(chaptersReleased) || 0,
      chaptersRead: Number(chaptersRead) || 0,
      volumesReleased: Number(volumesReleased) || 0,
      volumesRead: Number(volumesRead) || 0,
      website,
    };

    try {
      addSeries(newSeries)
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save series");
    }
  };
  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <View>
        <Text className="text-2xl font-bold text-center mb-4">Add New Series</Text>

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Title"
          placeholderTextColor={colors.onBackground}
          value={title}
          onChangeText={setTitle} />

        <DropDownPicker
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
          style={{ backgroundColor: colors.surfaceVariant, marginBottom: 12 }}
          dropDownContainerStyle={{ backgroundColor: colors.surfaceVariant }}
          textStyle={{ color: colors.onBackground }}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Author"
          placeholderTextColor={colors.onBackground}
          value={author}
          onChangeText={setAuthor}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          multiline={true}
          placeholder="Image Link"
          placeholderTextColor={colors.onBackground}
          value={coverImage}
          onChangeText={setCoverImage}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Chapters Released"
          placeholderTextColor={colors.onBackground}
          keyboardType="numeric"
          value={chaptersReleased}
          onChangeText={setChaptersReleased}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Chapters Read"
          placeholderTextColor={colors.onBackground}
          keyboardType="numeric"
          value={chaptersRead}
          onChangeText={setChaptersRead}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Volumes Released (Optional)"
          placeholderTextColor={colors.onBackground}
          keyboardType="numeric"
          value={volumesReleased}
          onChangeText={setVolumesReleased}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Volumes Read (Optional)"
          placeholderTextColor={colors.onBackground}
          keyboardType="numeric"
          value={volumesRead}
          onChangeText={setVolumesRead}
        />

        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Website Link"
          placeholderTextColor={colors.onBackground}
          value={website}
          onChangeText={setWebsite}
        />

        <View className="flex-row justify-around mt-4">
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleSave}>
            Save
          </Button>
        </View>
      </View>
    </View>
  );
};