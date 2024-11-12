// components/SensorList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { API_URL } from '@/constants/api';


interface Sensor {
  id: number;
  name: string;
  type: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  microcontrollerId: number;
}

interface Props {
  microcontrollerId: number;
}

const SensorList: React.FC<Props> = ({ microcontrollerId }) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    fetch(`${API_URL}/sensors`)
      .then(response => response.json())
      .then(json => {
        const filtered = json.data.filter((s: Sensor) => s.microcontrollerId === microcontrollerId);
        setSensors(filtered);
      })
      .catch(error => console.error('Error fetching sensors:', error));
  }, [microcontrollerId]);

  const renderSensor = ({ item }: { item: Sensor }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: "/graph", params: { sensorId: item.id } })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={sensors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSensor}
    />
  );
};

export default SensorList;
