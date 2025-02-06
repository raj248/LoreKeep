import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { Series, useSeriesStore } from "store/SeriesStore";
import { RootStackParamList } from "navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Surface, useTheme } from "react-native-paper";

type EditSeriesRouteProp = RouteProp<RootStackParamList, "EditSeries">;
type EditSeriesNavigationProp = StackNavigationProp<RootStackParamList, "EditSeries">;
export default function EditSeries() {
  const { colors } = useTheme();

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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Edit Series" />
        <Appbar.Action icon="check" onPress={handleSave} />
      </Appbar.Header>
      <View className="flex-1 px-4">
        <TextInput
          className="p-3 rounded-md mb-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Title"
          placeholderTextColor={colors.onBackground}
          value={title}
          onChangeText={setTitle}
        />
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
        <TextInput
          className="p-3 rounded-md mb-3 mt-3"
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Author"
          placeholderTextColor={colors.onBackground}

          value={author}
          onChangeText={setAuthor}
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
          className="p-3 rounded-md mb-3" multiline={true}
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Cover Image"
          placeholderTextColor={colors.onBackground}

          value={coverImage}
          onChangeText={setCoverImage}
        />

        <TextInput
          className="p-3 rounded-md mb-3" multiline={true}
          style={{ backgroundColor: colors.surfaceVariant, color: colors.onBackground }}
          placeholder="Website Link"
          placeholderTextColor={colors.onBackground}

          value={website}
          onChangeText={setWebsite}
        />
      </View>
    </View>
  );
};

