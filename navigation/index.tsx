import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../components/BackButton';
import Details from '../screens/details';
import Overview from '../screens/overview';
import Home from '../screens/home';
import AddSeries from 'screens/add';
import { StatusBar } from 'react-native';
import { Series } from 'store/SeriesStore';
import EditSeries from 'screens/edit';

export type RootStackParamList = {
  Overview: undefined;
  Details: { series: Series };
  Home: undefined;
  AddSeries: undefined;
  EditSeries: { series: Series };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />
      <Stack.Navigator initialRouteName="Overview" screenOptions={
        {
          headerStyle: {
            backgroundColor: '#f45ffe',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false
        }
      }>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddSeries" component={AddSeries} />
        <Stack.Screen name='EditSeries' component={EditSeries} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
