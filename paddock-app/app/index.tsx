// app/(tabs)/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PaddockList from '@/components/PaddockList';

export default function HomeScreen() {
  
  return (
    <View style={styles.container}>
      <PaddockList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50, 
  },
});
