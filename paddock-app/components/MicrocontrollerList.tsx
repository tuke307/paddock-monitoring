// components/MicrocontrollerList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { API_URL } from '@/lib/constants/api';
import SensorList from '@/components/SensorList';
import Microcontroller from '@/types/Microcontroller';


interface Props {
  paddockId: number;
}

const MicrocontrollerList: React.FC<Props> = ({ paddockId }) => {
  const [microcontrollers, setMicrocontrollers] = useState<Microcontroller[]>([]);

  useEffect(() => {
    // Fetch microcontrollers for the given paddock
    fetch(`${API_URL}/microcontrollers?paddockId=${paddockId}`)
      .then(response => response.json())
      .then(json => setMicrocontrollers(json.data))
      .catch(error => console.error('Error fetching microcontrollers:', error));
  }, [paddockId]);

  const renderMicrocontroller = ({ item }: { item: Microcontroller }) => (
    <View>
      <Card className='mt-3'>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <SensorList microcontrollerId={item.id} />
        </CardContent>
      </Card>
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
