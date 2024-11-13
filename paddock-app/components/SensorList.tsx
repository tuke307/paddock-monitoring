// components/SensorList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from "expo-router";
import { API_URL } from '@/constants/api';
import Sensor from '@/types/Sensor';
import Measurement from '@/types/Measurement';

interface Props {
  microcontrollerId: number;
}

const SensorList: React.FC<Props> = ({ microcontrollerId }) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [newestMeasurements, setNewestMeasurements] = useState<{ [key: number]: Measurement | null }>({});
  const router = useRouter();

  useEffect(() => {
    // Fetch sensors for the given microcontroller
    fetch(`${API_URL}/sensors?microcontrollerId=${microcontrollerId}`)
      .then(response => response.json())
      .then(json => {
        setSensors(json.data);
        
        // Fetch the newest measurement for each sensor
        json.data.forEach((sensor: Sensor) => {
          fetch(`${API_URL}/measurements/newest?sensorId=${sensor.id}`)
            .then(response => response.json())
            .then(json => {
              setNewestMeasurements(prev => ({ ...prev, [sensor.id]: json.data }));
            })
            .catch(error => console.error(`Error fetching newest measurement for sensor ${sensor.id}:`, error));
        });
      })
      .catch(error => console.error('Error fetching sensors:', error));
  }, [microcontrollerId]);

  const renderSensor = ({ item }: { item: Sensor }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: "/graph", params: { sensorId: item.id } })}>
      <Text>{item.name}</Text>
      {newestMeasurements[item.id] ? (
        <Text>Newest Value: {newestMeasurements[item.id]?.value}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
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
