import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { auth } from '@/config/firebase'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import { verticalScale } from '@/utils/styling'
import { signOut } from '@firebase/auth'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

const profile = () => {
  const router = useRouter();
  const {user} = useAuth();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight='fill'/>,
      routeName: '/(modals)/profileModal',
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <Icons.GearSix size={26} color={colors.white} weight='fill'/>,
      // routeName: '/(modals)/profileModal',
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight='fill'/>,
      // routeName: '/(modals)/profileModal',
      bgColor: colors.neutral600,
    },
    {
      title: "Log Out",
      icon: <Icons.Power size={26} color={colors.white} weight='fill'/>,
      // routeName: '/(modals)/profileModal',
      bgColor: "#e11d48",
    },
  ]

  const handleLogOut = async () => {
    await signOut(auth);
  }

  const showResetAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to log out?", [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'confirm',
        onPress: () => handleLogOut(),
        style: 'destructive',
      }
    ])
  }

  const handlePress = async (item: accountOptionType) => {
    if (item.title == 'Log Out') {
      showResetAlert();
    }
    if (item.routeName) router.push(item.routeName);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
        <Header title="Profile" style={{marginVertical: spacingY._10}}/>
        
        {/* user info (avatar, name) */}
        <View style={styles.userInfo}>
          {/* avatar */}
          <View>
            <Image source={getProfileImage(user?.image)} style={styles.avatar} contentFit='cover' transition={100}/>
          </View>

          {/* name */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>{user?.name}</Typo>
            <Typo size={16} fontWeight={"400"} color={colors.textLighter}>{user?.email}</Typo>
          </View>

        </View>
        
        {/* acount options */}
        <View style={styles.accountOptions}>
          {
            accountOptions.map((item, index)=>{
              return(
                <Animated.View key={index.toString()} entering={FadeInDown.delay(index * 100)} style={styles.listItem}>
                  <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                    <View style={[styles.listIcon, {backgroundColor: item.bgColor}]}>{item.icon}</View>
                    <Typo size={16} style={{flex: 1}} fontWeight={'700'}>{item.title}</Typo>
                    <Icons.CaretRight size={verticalScale(20)} weight='bold' color={colors.white}/>
                  </TouchableOpacity>
                </Animated.View>
              )
            })
          }
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous',
  }
})