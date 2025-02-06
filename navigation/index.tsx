import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { BackButton } from '../components/BackButton';
import { StatusBar } from 'react-native';
import { Series } from 'store/SeriesStore';
import Details from '../screens/details';
import Overview from '../screens/overview';
import Home from '../screens/home';
import AddSeries from 'screens/add';
import EditSeries from 'screens/edit';
import Login from 'screens/login';
import Debug from 'screens/debug';

import useAuthStore from 'store/AuthStore';
import { useEffect } from 'react';

export type RootStackParamList = {
  Overview: undefined;
  Details: { series: Series };
  Home: undefined;
  AddSeries: undefined;
  EditSeries: { series: Series };
  Debug: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


export default function RootStack() {
  const { user, restoreUser } = useAuthStore();

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />
      {user ? (<Stack.Navigator initialRouteName="Home" screenOptions={
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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
        <Stack.Screen name="AddSeries" component={AddSeries} />
        <Stack.Screen name='EditSeries' component={EditSeries} />
        <Stack.Screen name="Debug" component={Debug} />

      </Stack.Navigator>)
        : (
          <Login />
          // <Debug />
        )
      }
    </NavigationContainer>
  );
}
