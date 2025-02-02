Success! 🎉 Now, here's what's next:

Head over to https://console.firebase.google.com/ to create a new Firebase project.

Get the API key and other unique identifiers:

1. Register a web app in your Firebase project:
   https://firebase.google.com/docs/web/setup#register-app
2. Find your API key and other identifiers.
3. Copy these keys and paste them into your .env file.
4. Optionally, follow one of these guides to get started with Firebase:
   https://docs.expo.dev/guides/using-firebase/#next-steps
   Once you're done, run the following to get started:

To build for development:

1. cd lorekeep
2. npm install
3. eas build --profile=development
4. npm run start

To create a build to share with others:

1. cd lorekeep
2. npm install
3. eas build --profile=preview
