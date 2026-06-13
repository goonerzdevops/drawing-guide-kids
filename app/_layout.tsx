import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#00B3FF' }, headerTintColor: '#FFF', headerTitleStyle: { fontWeight: 'bold' } }}>
      <Stack.Screen name="index" options={{ title: 'Drawing Guide for Kids' }} />
      <Stack.Screen name="drawing/[id]" options={{ title: 'Panduan Menggambar' }} />
      <Stack.Screen name="journal" options={{ title: 'Jurnal Karya' }} />
    </Stack>
  );
}
