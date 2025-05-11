import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { CreateorUpdateWallet } from '@/services/walletService'
import { WalletType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

const walletModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
  });
  const router = useRouter();

  const HandleSubmit = async () => {
    let {name} = wallet;
    if (!name.trim()) {
      Alert.alert("Wallet", "Please fill all the fields");
      return ;
    }
    const data: WalletType = {
      name,
    };
    setIsLoading(true);
    const res = await CreateorUpdateWallet(data);
    setIsLoading(false);
    // console.log("result: ", res);
    if (res.success) {
      router.back();
    }
    else Alert.alert("Wallet", res.msg);
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title='New Wallet' leftIcon={<BackButton/>} style={{marginBottom: spacingY._10}}/>
        <ScrollView contentContainerStyle={styles.form}> 
          {/* input: walletname */}      
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
              placeholder='Salary'
              value={wallet.name}
              onChangeText={(value) => setWallet({...wallet, name: value})}
              icon={<Icons.Wallet size={verticalScale(36)} color={colors.neutral300} />}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button loading={isLoading} onPress={HandleSubmit} style={{flex: 1}}>
            <Typo fontWeight={'700'} color={colors.black} size={21}>Add Wallet</Typo>
          </Button>
        </View>
      </View>
    </ModalWrapper>
  )
}

export default walletModal

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
    },
    inputContainer: {
      gap: spacingY._10,
    }
})