import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { LineChart } from 'react-native-chart-kit';
import { API_URL } from '@/lib/constants/api';
import Measurement from '@/types/Measurement';
import { Button } from './ui/button';
import { useThemeContext } from '@/lib/hooks/useThemeContext';

interface Props {
  sensorId: string | string[] | undefined;  // Accept string from URL params
}
type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d';

const SensorChart: React.FC<Props> = ({ sensorId }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(true);
  const { colorScheme } = useThemeContext();
  const [useAbsoluteDates, setUseAbsoluteDates] = useState(false);

  // Convert CSS HSL to rgba
  const hslToRgba = (h: number, s: number, l: number, opacity = 1) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return `rgba(${Math.round(255 * f(0))}, ${Math.round(255 * f(8))}, ${Math.round(255 * f(4))}, ${opacity})`;
  };

  useEffect(() => {
    // Fetch measurements for the given sensor
    setLoading(true);
    fetch(`${API_URL}/measurements?sensorId=${sensorId}`)
      .then(response => response.json())
      .then(json => setMeasurements(json.data))
      .catch(error => console.error('Error fetching measurements:', error))
      .finally(() => setLoading(false));
  }, [sensorId]);

  const filteredMeasurements = useMemo(() => {
    if (useAbsoluteDates || measurements.length === 0) {
      return measurements;
    }

    // Get the latest date in the dataset instead of using current time
    const latestDate = new Date(Math.max(...measurements.map(m => new Date(m.createdAt).getTime())));

    const ranges = {
      '1h': latestDate.getTime() - 60 * 60 * 1000,
      '6h': latestDate.getTime() - 6 * 60 * 60 * 1000,
      '24h': latestDate.getTime() - 24 * 60 * 60 * 1000,
      '7d': latestDate.getTime() - 7 * 24 * 60 * 60 * 1000,
      '30d': latestDate.getTime() - 30 * 24 * 60 * 60 * 1000,
    };

    return measurements.filter(m => new Date(m.createdAt).getTime() > ranges[timeRange]);
  }, [measurements, timeRange, useAbsoluteDates]);


  // Calculate interval based on number of measurements and time range
  const getLabelInterval = () => {
    const count = filteredMeasurements.length;
    if (count <= 24) return 1;
    return Math.ceil(count / 12); // Show max ~12 labels
  };

  const formatLabel = (date: Date) => {
    if (timeRange === '30d' || timeRange === '7d') {
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    }
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  // Check for loading state and data after the fetch
  if (loading) {
    return <Text>Loading sensor data...</Text>;
  }

  // Check if we have data to display
  if (measurements.length === 0) {
    return <Text>No data available for this sensor.</Text>;
  }

  // Also check filtered measurements
  if (filteredMeasurements.length === 0) {
    return <Text>No data available for the selected time range.</Text>;
  }

  const data = {
    labels: filteredMeasurements
      .map((m) => formatLabel(new Date(m.createdAt)))
      .filter((_, index) => index % getLabelInterval() === 0),
    datasets: [{
      data: filteredMeasurements.map((m) => m.value),
      strokeWidth: 2,
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: colorScheme === 'dark' ? hslToRgba(24, 9.8, 10) : '#ffffff',
    backgroundGradientTo: colorScheme === 'dark' ? hslToRgba(24, 9.8, 10) : '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => colorScheme === 'dark'
      ? hslToRgba(142.1, 70.6, 45.3, opacity) // primary in dark mode
      : hslToRgba(142.1, 76.2, 36.3, opacity), // primary in light mode
    labelColor: (opacity = 1) => colorScheme === 'dark'
      ? hslToRgba(0, 0, 95, opacity) // foreground in dark mode
      : hslToRgba(240, 10, 3.9, opacity), // foreground in light mode
  };

  return (
    <View className='flex gap-2 py-4'>
      <View className='flex-row gap-2 justify-center'>
        {(['1h', '6h', '24h', '7d', '30d'] as TimeRange[]).map((range) => (
          <Button
            key={range}
            onPress={() => setTimeRange(range)}
            variant="outline"
          >
            <Text>
              {range}
            </Text>
          </Button>
        ))}
      </View>
      <Button
        onPress={() => setUseAbsoluteDates(!useAbsoluteDates)}
        variant="outline"
        className="self-center mb-2"
      >
        <Text>{useAbsoluteDates ? "Filter by Time Range" : "Show All Data"}</Text>
      </Button>

      <LineChart
        data={data}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        style={{
          borderRadius: 16,
        }}
        xLabelsOffset={10}
        verticalLabelRotation={-45}
        withDots={timeRange === '1h'}
        bezier
      />
    </View>
  );
};

export default SensorChart;