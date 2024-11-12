// components/MicrocontrollerList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { API_URL } from '@/constants/api';
import SensorList from '@/components/SensorList';

interface Microcontroller {
  id: number;
  name: string;
  location: string;
  manufacturer: string;
  masterChip: string;
  loraChip: string | null;
  serialNumber: string;
  macAddress: string;
  createdAt: string;
  updatedAt: string;
  paddockId: number;
}

interface Props {
  paddockId: number;
}

const MicrocontrollerList: React.FC<Props> = ({ paddockId }) => {
  const [microcontrollers, setMicrocontrollers] = useState<Microcontroller[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/microcontrollers`)
      .then(response => response.json())
      .then(json => {
        const filtered = json.data.filter((mc: Microcontroller) => mc.paddockId === paddockId);
        setMicrocontrollers(filtered);
      })
      .catch(error => console.error('Error fetching microcontrollers:', error));
  }, [paddockId]);

  const renderMicrocontroller = ({ item }: { item: Microcontroller }) => (
    <View>
      <Text>{item.name}</Text>
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

export default MicrocontrollerList;
