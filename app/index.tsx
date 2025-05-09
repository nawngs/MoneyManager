import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'

const index = () => {
  const router = useRouter();
  useEffect(() => {
    const CheckData = async () => {
      try {
        const userName = await AsyncStorage.getItem("name");
        if (userName != null) {
            router.push("/(tabs)");
        }
        else {
          router.push("/(auth)/welcome");
        }
      } catch {
        router.push("/(auth)/welcome");
      }
    };

    CheckData();
  }, []);
  return (
    <ScreenWrapper style = {styles.container}>
      <Image
        style = {styles.logo}
        resizeMode='contain'
        source={require("../assets/images/welcome.png")}
      />
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "35%",
    aspectRatio: 1
  }
})