import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BeltProvider } from '../contexts/BeltContext';

export default function RootLayout() {
  return (
    <BeltProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#222222' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Welcome' }} />
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="study-flow" options={{ title: 'Study Flow' }} />
        <Stack.Screen name="free-flow" options={{ title: 'Free Flow' }} />
        <Stack.Screen name="library" options={{ title: 'Library' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      </Stack>
    </BeltProvider>
  );
}
