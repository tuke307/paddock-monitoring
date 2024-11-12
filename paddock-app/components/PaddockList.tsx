// components/PaddockList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '@/constants/api';
import MicrocontrollerList from '@/components/MicrocontrollerList';

interface Paddock {
  id: number;
  name: string;
  description: string;
  shape: string;
  createdAt: string;
  updatedAt: string;
}

const PaddockList = () => {
  const [paddocks, setPaddocks] = useState<Paddock[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/paddocks`)
      .then(response => response.json())
      .then(json => setPaddocks(json.data))
      .catch(error => console.error('Error fetching paddocks:', error));
  }, []);

  const renderPaddock = ({ item }: { item: Paddock }) => (
    <View style={styles.paddockContainer}>
      <Text style={styles.paddockName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <MicrocontrollerList paddockId={item.id} />
    </View>
  );

  return (
    <FlatList
      data={paddocks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPaddock}
    />
  );
};

const styles = StyleSheet.create({
  paddockContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paddockName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaddockList;
