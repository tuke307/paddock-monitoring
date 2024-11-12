// components/SensorChart.tsx
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { API_URL } from '@/constants/api';

interface Measurement {
  id: number;
  value: number;
  timestamp: string;
  sensorId: number;
}

interface Props {
  sensorId: number;
}

const SensorChart: React.FC<Props> = ({ sensorId }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/measurements?sensorId=${sensorId}`)
      .then(response => response.json())
      .then(json => setMeasurements(json.data))
      .catch(error => console.error('Error fetching measurements:', error));
  }, [sensorId]);

  if (measurements.length === 0) {
    return <Text>No data available for this sensor.</Text>;
  }

  const data = {
    labels: measurements.map((m) => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        data: measurements.map((m) => m.value),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width - 32} // Adjust for padding
      height={220}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default SensorChart;
