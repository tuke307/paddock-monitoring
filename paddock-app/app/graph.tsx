// app/(tabs)/graph.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SensorChart from '@/components/SensorChart';
import { useRoute } from '@react-navigation/native';

export default function GraphScreen() {
  const route = useRoute();
  const { sensorId } = route.params as { sensorId: number };

  return (
    <View style={styles.container}>
      <SensorChart sensorId={sensorId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
