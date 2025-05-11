import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const wallet = () => {
  const router = useRouter();
  const getTotalBalance = () => {
    return 2300;
  }
  return (
    <ScreenWrapper style={{backgroundColor: colors.black}}>
      <View style={styles.container}>
        {/* balance */}
        <View style={styles.balanceView}>
          <View style={{alignItems: 'center'}}>
            <Typo size={45} fontWeight={'600'}>A$ {getTotalBalance()?.toFixed(2)}</Typo>
            <Typo size={16} color={colors.textLight}>Total Balance</Typo>
          </View>
        </View>

        {/* wallet */}
        <View style={styles.wallets}>
          {/* header */}
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={'400'}>My Wallets</Typo>
            <TouchableOpacity onPress={() => router.push("/(modals)/walletModal")}>
              <Icons.PlusCircle weight='fill' color={colors.primary} size={verticalScale(33)}/>
            </TouchableOpacity>
          </View>

          {/* list */}

        </View>
      </View>
    </ScreenWrapper>
  )
}

export default wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10,
    marginTop: spacingY._12,
    marginHorizontal: spacingX._10,
  }
})