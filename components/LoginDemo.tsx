import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from './Container'
import { GoogleSignin, GoogleSigninButton, SignInResponse } from '@react-native-google-signin/google-signin'
import { Button } from './Button';
import { Image } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const LoginDemo = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "950920676991-t7ug3u1ft9cdri8jfeb08fmmcvefgdu4.apps.googleusercontent.com",
      offlineAccess: true
    })
  })
  const [userInfo, setUserInfo] = useState<SignInResponse | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      console.log(user.data);
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
    <Container>
      <Text className='text-2xl font-bold text-center'>Google Login</Text>
      <Text>{JSON.stringify(error)}</Text>

      {userInfo && (
        <View className='flex-1 justify-center items-center'>
          <Image source={userInfo.data?.user.photo?.replace("s96-c", "s400")}
            style={{ width: "50%", aspectRatio: 1, borderRadius: "50%" }}
            contentFit="contain"
            placeholder={{ blurhash }}
          />
          <Text
            className='text-2xl text-center'
          >{userInfo.data?.user.name}</Text>
          <Text
            className='text-2xl text-center'
          >{userInfo.data?.user.email}</Text>
        </View>
      )}
      {userInfo ? (
        <View>
          <Button onPress={logout} title="Logout" />
        </View>
      ) : (
        <View className='flex-1 justify-around items-center'>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signin}
          />
        </View>
      )}
    </Container>
  )
}


const styles = StyleSheet.create({})