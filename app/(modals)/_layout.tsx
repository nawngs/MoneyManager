import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profileModal"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="walletModal"
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack>
  );
}
