// components/SensorList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { API_URL } from '@/constants/api';
import Sensor, { SensorType } from '@/types/Sensor';
import Measurement from '@/types/Measurement';
import { formatUTCDateToLocal } from '@/utils/date';

interface Props {
  microcontrollerId: number;
}

function getReadableSensorType(type: SensorType): string {
  switch (type) {
    case SensorType.TEMPERATURE:
      return 'Temperature';
    default:
      return 'Unknown';
  }
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
    <View style={styles.sensorContainer}>
      <Text>Name: {item.name}</Text>
      <Text>Typ: {getReadableSensorType(item.type)}</Text>
      <Text>
        {newestMeasurements[item.id] ? (
          `aktuellster Wert: ${newestMeasurements[item.id]?.value}`
        ) : (
          'Loading...'
        )}
      </Text>

      <Text>
        {newestMeasurements[item.id] ? (
          `letzte Rückmeldung: ${formatUTCDateToLocal(newestMeasurements[item.id]?.createdAt)}`
        ) : (
          'Loading...'
        )}
      </Text>
      <TouchableOpacity onPress={() => router.push({ pathname: "/graph", params: { sensorId: item.id } })}>
        <Text style={styles.graphText}>Graph</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={sensors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSensor}
    />
  );
};

const styles = StyleSheet.create({
  sensorContainer: {
    marginTop: 10,
  },
  sensorName: {
    fontSize: 16,
  },
  graphText: {
    color: 'blue',
  },
});

export default SensorList;
