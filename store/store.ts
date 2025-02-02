import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Series = {
  id: string;
  title: string;
  type: string;
  author: string;
  coverImage: string;
  chaptersRead: number;
  chaptersReleased: number;
  volumesRead?: number;
  volumesReleased?: number;
  website?: string;
};

type SeriesStore = {
  seriesList: Series[];
  loadSeries: () => Promise<void>;
  addSeries: (series: Series) => Promise<void>;
  updateSeries: (updatedSeries: Series) => Promise<void>;
  deleteSeries: (id: string) => Promise<void>;
};

export const useSeriesStore = create<SeriesStore>((set) => ({
  seriesList: [],

  // Load series from AsyncStorage
  loadSeries: async () => {
    const savedSeries = await AsyncStorage.getItem("seriesList");
    if (savedSeries) {
      set({ seriesList: JSON.parse(savedSeries) });
    }
  },

  // Add a new series
  addSeries: async (series) => {
    set((state) => {
      const updatedList = [...state.seriesList, series];
      AsyncStorage.setItem("seriesList", JSON.stringify(updatedList));
      return { seriesList: updatedList };
    });
  },

  // Update an existing series
  updateSeries: async (updatedSeries) => {
    set((state) => {
      const updatedList = state.seriesList.map((s) =>
        s.id === updatedSeries.id ? updatedSeries : s
      );
      AsyncStorage.setItem("seriesList", JSON.stringify(updatedList));
      return { seriesList: updatedList };
    });
  },

  // Delete a series
  deleteSeries: async (id) => {
    set((state) => {
      const updatedList = state.seriesList.filter((s) => s.id !== id);
      AsyncStorage.setItem("seriesList", JSON.stringify(updatedList));
      return { seriesList: updatedList };
    });
  },
}));
