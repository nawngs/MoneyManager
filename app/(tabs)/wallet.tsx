import Loading from '@/components/Loading'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import WalletListItem from '@/components/WalletListItem'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import UseFetchData from '@/hooks/UseFetchData'
import { WalletType } from '@/types'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import { orderBy, where } from 'firebase/firestore'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

const wallet = () => {
  const router = useRouter();
  const {user} = useAuth();

  const {data: wallets, error, loading} = UseFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);
  const getTotalBalance = () => 
    wallets.reduce((total, item) => {
      total += (item.amount || 0);
      return total;
    }, 0);
  
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
          {loading && <Loading />}
          <FlatList
            data={wallets}
            renderItem={({item, index})=>{
              return <WalletListItem item={item} index={index} router={router} />
            }}
            contentContainerStyle={styles.listStyle}
          />
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
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  }
})