import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PaddockList from '@/components/PaddockList';

export default function HomeScreen() {
  
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>
        <PaddockList />
      </View>
    </SafeAreaView>
  );
}
