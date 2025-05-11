import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

const welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*login button + image */}
        <View style={styles.loginButton}>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Typo>Sign In</Typo>
          </TouchableOpacity>
        </View>
        <View>
          {/* image */}
          <Animated.Image
            entering={FadeIn.duration(1500)}
            source={require('../../assets/images/get_started.png')}
            style ={styles.welcomeImage}
            resizeMode='contain'
          />
        </View>

        {/* footer */}
        <View style = {styles.footer}>
          <Animated.View entering={FadeInDown.duration(1000)} style={{alignItems: 'center'}}>
            <Typo size={30} fontWeight={'800'}>Your money, your control</Typo>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(1000).delay(100)} style={{alignItems: 'center', gap: 2}}>
            <Typo size={17} color={colors.textLight}>It's time to take charge of your money, set bold goals</Typo>
            <Typo size={17} color={colors.textLight}>and watch your progress in real-time.</Typo>
          </Animated.View>
        
          <Animated.View entering={FadeInDown.duration(1000).delay(200)} style={styles.buttonContainer}>
            <Button onPress = {() => router.push('/(auth)/register')}>
              <Typo size={22} color={colors.neutral900}>Get Started</Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacingY._7,
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginRight: spacingX._20,
  },
  welcomeImage: {
    width: '100%',
    height: verticalScale(300),
    alignSelf: 'center',
    marginTop: verticalScale(100),
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: -10},
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX._25,
  }
})