// components/MicrocontrollerList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '@/constants/api';
import SensorList from '@/components/SensorList';
import Microcontroller from '@/types/Microcontroller';


interface Props {
  paddockId: number;
}

const MicrocontrollerList: React.FC<Props> = ({ paddockId }) => {
  const [microcontrollers, setMicrocontrollers] = useState<Microcontroller[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/microcontrollers?paddockId=${paddockId}`)
      .then(response => response.json())
      .then(json => setMicrocontrollers(json.data))
      .catch(error => console.error('Error fetching microcontrollers:', error));
  }, [paddockId]);

  const renderMicrocontroller = ({ item }: { item: Microcontroller }) => (
    <View style={styles.mikrocontrollerContainer}>
      <Text  style={styles.mikrocontrollerName}>{item.name}</Text>
      <SensorList microcontrollerId={item.id} />
    </View>
  );

  return (
    <FlatList
      data={microcontrollers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMicrocontroller}
    />
  );
};

const styles = StyleSheet.create({
  mikrocontrollerContainer: {
    marginTop: 10,
  },
  mikrocontrollerName: {
    fontSize: 16,
  },
});

export default MicrocontrollerList;
