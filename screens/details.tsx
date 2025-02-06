import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Image, ImageBackground } from 'expo-image';

import { useSeriesStore } from "store/SeriesStore";

import { RootStackParamList } from '../navigation';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Appbar, Button, Dialog, Portal, Surface, Text, useTheme } from "react-native-paper";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function Details() {
  const { colors } = useTheme();
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const router = useRoute<DetailsScreenRouteProp>();
  const { series } = router.params; // Get series data from navigation
  const { deleteSeries } = useSeriesStore();

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleDelete = async () => {
    try {
      deleteSeries(series.id);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to delete series.");
    }
  }
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Are You Sure?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">This is will permanently delete {series.title}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete} textColor="red">Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title={series.title} />
        <Appbar.Action icon="book-edit" onPress={() => { navigation.navigate("EditSeries", { series }) }} />
        <Appbar.Action icon="delete" onPress={showDialog} />
      </Appbar.Header>

      <Surface className="py-4 px-4">
        <Image source={series.coverImage}
          style={{ width: "100%", height: 300 }}
          contentFit="contain"
          placeholder={{ blurhash }}
        />
      </Surface>
      <Surface className="py-4 px-4 mt-4">
        <Text className="text-gray-400 text-lg mb-2">{series.type}</Text>
        <Text className="text-gray-300 text-md mb-1">Author: {series.author}</Text>
        {series.website ? (
          <Text className="text-blue-400 text-md mb-3">{series.website}</Text>
        ) : null}
        <Text className="text-gray-300 text-md">Chapters Read: {series.chaptersRead}/{series.chaptersReleased}</Text>
        <Text className="text-gray-300 text-md">Volumes Read: {series.volumesRead}/{series.volumesReleased}</Text>
      </Surface>

    </View>
  );
};
