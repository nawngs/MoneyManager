import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { useAuth } from '@/contexts/authContext';
import React from 'react';
import { StyleSheet } from 'react-native';

const index = () => {
  const {user} = useAuth();
  // console.log(user);
  return (
    <ScreenWrapper>
      <Typo>index</Typo>
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({})