import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Text, Surface, ActivityIndicator, MD2Colors, useTheme } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import useAuthStore from 'store/AuthStore';


export default function Login() {
  const { colors } = useTheme();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "950920676991-t7ug3u1ft9cdri8jfeb08fmmcvefgdu4.apps.googleusercontent.com",
      offlineAccess: true
    })
  })
  const { user, signIn, isLoading, error } = useAuthStore();
  return (
    <View style={{ backgroundColor: "rgb(255, 251, 255)" }}
      className="flex-1 items-center justify-center">
      <Image
        source={require('../assets/adaptive-icon.png')}
        style={{ width: "100%", height: 300, resizeMode: "contain" }}
      />
      {!user && !isLoading ? (
        <Surface style={{ backgroundColor: "rgb(237, 221, 246)" }}
          className='py-10 px-10 mt-10 rounded-full rounded-md'>
          <Text variant="headlineMedium" style={{ color: "rgb(44, 0, 81)" }}>
            Welcome to Lore Keep
          </Text>

          <Button
            mode="contained"
            icon="google"
            onPress={signIn}
            loading={isLoading}
            disabled={isLoading}
            style={styles.googleButton}
          >
            Sign in with Google
          </Button>

          {error && (
            <Text style={{ color: colors.error }}>
              {error.message}
            </Text>
          )}
        </Surface>)
        :
        (<ActivityIndicator animating={true} size={"large"} color={colors.primary} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 24,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  googleButton: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
