import './global.css';

import 'react-native-gesture-handler';
import { DefaultTheme, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import RootStack from './navigation';
import { useColorScheme } from "react-native";


export default function App() {
  const scheme = useColorScheme(); // Detect system theme
  const theme = scheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  return (
    <PaperProvider theme={theme}>
      <RootStack />
    </PaperProvider>
  );
}
