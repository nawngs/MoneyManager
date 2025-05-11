import { colors, spacingX } from '@/constants/theme'
import { WalletType } from '@/types'
import { verticalScale } from '@/utils/styling'
import { Router } from 'expo-router'
import * as Icons from "phosphor-react-native"
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Typo from './Typo'

const WalletListItem = ({
  item,
  index,
  router
}: {
  item: WalletType,
  index: number,
  router: Router,
}) => {

  const openWallet = () => {
    router.push({pathname: '/(modals)/walletModal', params: {
      id: item.id,
      name: item.name,
    }})
  }

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.nameContainer}>
          <Typo size={16} fontWeight={'700'}>{item.name}</Typo>
          <Typo size={14} color={colors.neutral400}>A${item.amount}</Typo>
        </View>
        
        <Icons.CaretRight size={verticalScale(20)} weight='bold' color={colors.white}/>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default WalletListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(17),
    marginLeft: spacingX._5,
    marginRight: spacingX._15,
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  }
})