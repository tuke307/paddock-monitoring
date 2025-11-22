// components/PaddockList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { H2 } from '@/components/ui/typography';
import { API_URL } from '@/lib/constants/api';
import MicrocontrollerList from '@/components/MicrocontrollerList';
import Paddock from '@/types/Paddock';


const PaddockList = () => {
  const [paddocks, setPaddocks] = useState<Paddock[]>([]);

  useEffect(() => {
    // Fetch all paddocks
    fetch(`${API_URL}/paddocks`)
      .then(response => response.json())
      .then(json => setPaddocks(json.data))
      .catch(error => console.error('Error fetching paddocks:', error));
  }, []);

  const renderPaddock = ({ item }: { item: Paddock }) => (
    <View className="p-6">
      <H2>{item.name}</H2>

      <MicrocontrollerList paddockId={item.id}/>
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

export default PaddockList;
