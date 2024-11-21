// components/SensorList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Thermometer } from '@/lib/icons/Thermometer';
import { useRouter } from "expo-router";
import { API_URL } from '@/lib/constants/api';
import Sensor, { SensorType } from '@/types/Sensor';
import Measurement from '@/types/Measurement';
import { formatUTCDateToLocal } from '@/lib/utils/date';

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
    <View className='flex-1'>
      <Card className='h-[300px] flex flex-col justify-between'>
        <CardHeader>
          <View className="flex flex-row items-center">
          <CardTitle>{item.name}</CardTitle>
          {item.type === SensorType.TEMPERATURE && (
            <Thermometer size={20} className="ml-3" />
          )}
        </View>
        </CardHeader>
        <CardContent>
          <Text>Type: {getReadableSensorType(item.type)}</Text>
          <Text>Value: {newestMeasurements[item.id] ? newestMeasurements[item.id]?.value : 'N/A'}</Text>
          <Text>Measured at: {newestMeasurements[item.id] ? formatUTCDateToLocal(newestMeasurements[item.id]?.createdAt) : 'N/A'}</Text>
        </CardContent>
        <CardFooter>
          <Button onPress={() => router.push(`/graph?sensorId=${item.id}`)} variant="link"><Text>zum Graph</Text></Button>
        </CardFooter>
      </Card>
    </View>
  );

  return (
    <FlatList
      data={sensors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSensor}
      numColumns={2}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
};

export default SensorList;
