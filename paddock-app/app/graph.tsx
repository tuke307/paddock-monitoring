import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import SensorChart from '@/components/SensorChart';

export default function GraphScreen() {
  const { sensorId } = useLocalSearchParams<{ sensorId: string }>();

  return (
    <View className='flex-1 p-15'>
      <SensorChart sensorId={sensorId} />
    </View>
  );
}
