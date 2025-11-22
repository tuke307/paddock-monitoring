import 'react-native-reanimated';
import { Theme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { NAV_THEME } from '@/lib/constants/constants';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeContextProvider, useThemeContext } from '@/lib/hooks/useThemeContext';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import "@/global.css";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { colorScheme, isLoaded } = useThemeContext();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  const isDarkColorScheme = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="graph" options={{ title: 'Sensor Graph' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
      <View className='absolute bottom-4 right-4 z-50'>
        <ThemeSwitch />
      </View>
      <PortalHost />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <RootLayoutContent />
    </ThemeContextProvider>
  );
}
