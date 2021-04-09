import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        //Splashscreen.showAsync();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });

      } catch (e) {
        console.warn(e);

      } finally {
        setLoadingComplete(true);
        //SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

