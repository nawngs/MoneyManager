import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useRef, useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {login: loginUser} = useAuth();

  const handleLogin = async ()=>{
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all fields');
      return ;
    }
    // console.log(emailRef.current, passwordRef.current, "ok");
    setIsLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Log In", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}> 
        {/*back button and text */}
        <BackButton iconSize={30}/>
        
        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={'800'}>Hey, </Typo>
          <Typo size={30} fontWeight={'800'}>welcome back </Typo>
        </View>

        <View style={styles.form}> 
          <Typo size={16} color={colors.textLight}>Login to track your expenses</Typo>

          {/* input: email, password */}
          <Input 
            placeholder='Enter your email'
            onChangeText={value=>(emailRef.current = value)}
            icon={<Icons.Envelope size={verticalScale(36)} color={colors.neutral300} />}
          />

          <Input 
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={value=>(passwordRef.current = value)}
            icon={<Icons.Lock size={verticalScale(36)} color={colors.neutral300} />}
          />

          <Typo size={14} color={colors.text} style={{alignSelf: 'flex-end'}}>Forgot password?</Typo>
          <Button loading={isLoading} onPress={handleLogin}>
            <Typo fontWeight={'700'} color={colors.black} size={21}>Login</Typo>
          </Button>
        </View>

        <View style = {styles.footer}>
          <Typo size={15}>Don't have an account?</Typo>
          <Pressable onPress={()=>router.push('/(auth)/register')}>
            <Typo size={15} fontWeight={'700'} color={colors.primary}>Sign up</Typo>
          </Pressable>
        </View>

      </View>

    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20, 
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  }
})