import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
