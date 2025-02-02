export default {
  "expo": {
    "name": "lorekeep",
    "slug": "lorekeep",
    "version": "1.0.0",
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "experiments": {
      "tsconfigPaths": true
    },
    "plugins": [
      [
        "expo-dev-launcher",
        {
          "launchMode": "most-recent"
        }
      ],
      ["@react-native-google-signin/google-signin"]
    ],
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.shashankraj007281.lorekeep"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.shashankraj007281.lorekeep",
      "googleServicesFile": process.env.GOOGLE_SERVICES_FILE
    },
    "extra": {
      "eas": {
        "projectId": "8493dbf3-6300-42ab-9460-889bf9b573fc"
      }
    }
  }
}
