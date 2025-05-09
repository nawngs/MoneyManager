import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { getProfileImage } from '@/services/imageService'
import { scale, verticalScale } from '@/utils/styling'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const Register = () => {
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const uri = await AsyncStorage.getItem("image");
      if (uri) {
        setImageUri(uri);
      }
    };
    loadImage();
  }, []);

  const handleLogin = async ()=>{
    if (!nameRef.current) {
      Alert.alert('Sign up', 'Please fill all fields');
      return ;
    }
    // console.log(nameRef.current, emailRef.current, passwordRef.current, "ok");
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("name", nameRef.current);
      router.push("/(tabs)")
    } catch (error) {
      Alert.alert("Sign up", "failed to save name");
    }
  };

  const handlePickImage = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      await AsyncStorage.setItem("image", result.assets[0].uri);
      setImageUri(result.assets[0].uri)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}> 
        {/*back button and text */}
        <BackButton iconSize={30}/>
        
        <View style={{alignItems: 'center'}}>
          <Typo size={30} fontWeight={'800'}>Let's get started </Typo>
        </View>

        <ScrollView contentContainerStyle={styles.form}> 
          {/* avatar and input: name */}
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(imageUri)}
              contentFit='cover'
              transition={100}
            />

            <TouchableOpacity onPress={handlePickImage} style={styles.editIcon}>
               <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
               />
            </TouchableOpacity>
          </View>
          
          <Input 
            placeholder='Enter your name'
            onChangeText={value=>(nameRef.current = value)}
            icon={<Icons.User size={verticalScale(36)} color={colors.neutral300} />}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button loading={isLoading} onPress={handleLogin} style={{flex: 1}}>
            <Typo fontWeight={'700'} color={colors.black} size={21}>Sign up</Typo>
          </Button>
        </View>

      </View>

    </ScreenWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20, 
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