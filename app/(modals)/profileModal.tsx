import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/services/imageService'
import { updateUser } from '@/services/userService'
import { UserDataType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const profileModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  })
  const {user, updateUserData } = useAuth();

  useEffect(()=>{
    setUserData({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);

  const handleUpdate = async () => {
    let {name, image} = userData;
    if (!name.trim()) {
      Alert.alert("Update User", "please fill all the fields");
      return ;
    }
    setIsLoading(true);
    const res = await updateUser(user?.uid as string, userData);
    setIsLoading(false);
    if (res.success) {
      updateUserData(user?.uid as string);
      router.back();
    }
    else {
      Alert.alert("Update User", res.msg);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({...userData, image: result.assets[0]});
    }
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title='Update Profile' leftIcon={<BackButton/>} style={{marginBottom: spacingY._10}}/>
        <ScrollView contentContainerStyle={styles.form}> 
          {/* avatar and input: name */}
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit='cover'
              transition={100}
            />

            <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
               <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
               />
            </TouchableOpacity>
          </View>
          
          <Input
            placeholder='Name'
            value={userData.name}
            onChangeText={(value) => setUserData({...userData, name: value})}
            icon={<Icons.User size={verticalScale(36)} color={colors.neutral300} />}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button loading={isLoading} onPress={handleUpdate} style={{flex: 1}}>
            <Typo fontWeight={'700'} color={colors.black} size={21}>Update</Typo>
          </Button>
        </View>
      </View>
    </ModalWrapper>
  )
}

export default profileModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  form: {
      gap: spacingY._30,
      marginTop: spacingY._20,
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: spacingX._20,
      gap: scale(12),
      paddingTop: spacingY._15,
      borderTopColor: colors.neutral700,
      marginBottom: spacingY._20,
      borderTopWidth: 1,
    },
    avatarContainer: {
      position: 'relative',
      alignSelf: 'center',
    },
    avatar: {
      alignSelf: 'center',
      backgroundColor: colors.neutral300,
      height: verticalScale(135),
      width: verticalScale(135),
      borderRadius: 200,
      borderWidth: 1,
      borderColor: colors.neutral500,
    },
    editIcon: {
      position: 'absolute',
      bottom: spacingY._5,
      right: spacingX._7,
      borderRadius: 100,
      backgroundColor: colors.neutral100,
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 4,
      padding: spacingY._7,
    }
})