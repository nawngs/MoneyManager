import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

const index = () => {
  const router = useRouter();
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