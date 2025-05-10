import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name='(modals)/profileModal' options={{
      presentation: 'modal',
    }} /> */}
  </Stack>
}

export default StackLayout;

const styles = StyleSheet.create({})