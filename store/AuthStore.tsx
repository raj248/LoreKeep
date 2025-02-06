// store.ts
import { create } from 'zustand';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: Error | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  restoreUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,


  signIn: async () => {
    set({ isLoading: true, error: null });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo); // { JSON.stringify(userInfo) };
      const tokens = await GoogleSignin.getTokens();

      set({
        user: userInfo.data,
        accessToken: tokens.accessToken,
        isLoading: false,
      });

      // Persist user and tokens to AsyncStorage
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          user: userInfo.data,
          accessToken: tokens.accessToken,
        })
      );
      console.log(userInfo.data);
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.log(error);
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await GoogleSignin.signOut();
      set({
        user: null,
        accessToken: null,
        isLoading: false
      });

      await AsyncStorage.removeItem('user');

    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  restoreUser: async () => {
    set({ isLoading: true, error: null });
    try {
      // Retrieve persisted data from AsyncStorage
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const userInfo = JSON.parse(userString);

        // Restore user and tokens to the store
        set({
          user: userInfo.user,
          accessToken: userInfo.accessToken,
          isLoading: false
        });
        console.log("loaded user" + userInfo.user);
      } else {
        set({ isLoading: false, error: null });
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));

export default useAuthStore;