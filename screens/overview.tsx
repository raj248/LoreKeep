import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContent } from 'components/ScreenContent';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';
import { useEffect, useState } from 'react';
import { GoogleSignin, GoogleSigninButton, SignInResponse } from '@react-native-google-signin/google-signin';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [error, setError] = useState<Error | undefined>();
  const [userInfo, setUserInfo] = useState<SignInResponse | undefined>();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "950920676991-t7ug3u1ft9cdri8jfeb08fmmcvefgdu4.apps.googleusercontent.com"
    })
  })

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log(userInfo.data?.user);
    } catch (error: any) {
      setError(error);
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(undefined);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() =>
          navigation.navigate('Home')
        }
        title="Home"
      />

      <Text>{JSON.stringify(error)}</Text>
      {userInfo && (
        <View>
          <Text>{JSON.stringify(userInfo.data?.user)}</Text>
        </View>
      )}
      {userInfo ? (
        <View>
          <Button onPress={logout} title="Logout" />
        </View>
      ) : (
        <View>
          <Button onPress={signin} title="Signin" />
          <GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={signin} />
        </View>
      )}

    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
