import React from 'react';
import { View } from 'react-native';
import PaddockList from '@/components/PaddockList';

export default function HomeScreen() {
  
  return (
    <View className="flex-1 gap-5 p-6">
      <PaddockList />
    </View>
  );
}
