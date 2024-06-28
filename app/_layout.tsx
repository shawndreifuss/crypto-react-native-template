import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack,  useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, useSegments } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`${key} saved with value: ${value}`);
    } catch (err) {
      console.error("SecureStore set item error: ", err);
    }
  },
};


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Initialayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]); 

  useEffect(() => {
    console.log('isSignedIn', isSignedIn);
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === 'authenticated'

    if (isSignedIn && ! inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    } else if (!isSignedIn) {
      router.replace('/')
    }
}, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Text>...loafinh</Text>  
  }

  return (
    <Stack>
      {/*  SignUp Screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      {/*  Login Screen */}
       <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={'/help'} asChild >
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
            </TouchableOpacity>
            </Link>
          ),
        }}
      />

      {/*  Help Screen */}
      <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />

      {/* Verify Phone Screen */}
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

<Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/lock"
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/account"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={34} color={'#fff'} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

const RootLayoutNav = () => {
  return (
 <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey!}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Initialayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
