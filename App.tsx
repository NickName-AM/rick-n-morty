import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootNavigator from './src/navigation/RootNavigator';

// Prevent auto-hiding the splash screen until fonts are ready
SplashScreen.preventAutoHideAsync();

// Module-level QueryClient — singleton, not recreated on re-render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,         // 5 minutes — Rick & Morty data is static
      gcTime: 1000 * 60 * 10,           // 10 minutes (TanStack Query v5 name for garbage-collect time)
      retry: 2,
      refetchOnWindowFocus: false,       // Mobile apps don't have browser window focus events
    },
  },
});

export default function App(): React.JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Safety fallback: hide splash after 3s regardless of font state, so the
  // app never gets permanently stuck if font loading hangs in Expo Go dev mode.
  useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hideAsync(), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <RootNavigator />
    </QueryClientProvider>
  );
}
