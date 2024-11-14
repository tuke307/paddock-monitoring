// components/SensorChart.tsx
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { LineChart } from 'react-native-chart-kit';
import { API_URL } from '@/lib/constants/api';
import Measurement from '@/types/Measurement';
import { formatUTCDateToLocal } from '@/lib/utils/date';

interface Props {
  sensorId: number;
}

const SensorChart: React.FC<Props> = ({ sensorId }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    // Fetch measurements for the given sensor
    fetch(`${API_URL}/measurements?sensorId=${sensorId}`)
      .then(response => response.json())
      .then(json => setMeasurements(json.data))
      .catch(error => console.error('Error fetching measurements:', error));
  }, [sensorId]);

  if (measurements.length === 0) {
    return <Text>No data available for this sensor.</Text>;
  }

  const data = {
    labels: measurements
      .map((m) => new Date(m.createdAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }))
      .filter((_, index) => index % 15 === 0),
    datasets: [
      {
        data: measurements.map((m) => m.value),
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      padding: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth - 32} // Adjust for padding
        height={300}
        chartConfig={chartConfig}
        style={{
          borderRadius: 16,
        }}
        xLabelsOffset={-10}
        verticalLabelRotation={40}
        withDots
        bezier
      />
    </View>
  );
};

export default SensorChart;
