import { Paddock, Microcontroller, Sensor, Measurement, SensorType } from '@prisma/client';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const paddocks = [
  {
    id: 1,
    name: 'Koppel oben',
    description: 'etwas erhöht'
  },
  {
    id: 2,
    name: 'Koppel unten',
    description: 'auf gleicher ebene mit haus'
  }
];

const microcontrollers = [
  {
    id: 1,
    name: 'Microcontroller oben - 1',
    manufacturer: 'Heltec',
    masterChip: 'ESP32-S3FN8',
    loraChip: 'SX1262',
    location: 'in schwarzer Plastikbox auf der oberen Koppel',
    paddockId: 1
  },
  {
    id: 2,
    name: 'Microcontroller unten - 2',
    manufacturer: 'Heltec',
    masterChip: 'ESP32-S3FN8',
    loraChip: 'SX1262',
    location: 'in schwarzer Plastikbox auf der unteren Koppel',
    paddockId: 2
  },
  {
    id: 3,
    name: 'Microcontroller Haus - 3',
    manufacturer: 'Heltec',
    masterChip: 'ESP32-S3FN8',
    loraChip: 'SX1262',
    location: 'in schwarzer Plastikbox im Haus',
  }
];

const sensors = [
  {
    id: 1,
    name: 'Sensor oben - 1',
    type: SensorType.TEMPERATURE,
    location: 'an Microcontroller 1, obere Koppel',
    microcontrollerId: 1
  },
  {
    id: 2,
    name: 'Sensor unten - 2',
    type: SensorType.TEMPERATURE,
    location: 'an Microcontroller 2, untere Koppel',
    microcontrollerId: 2
  },
];

interface SensorInitialValue {
  sensorId: number;
  initialValue: number;
}

const sensorsInitialValues: SensorInitialValue[] = [
  { sensorId: 1, initialValue: 20.0 }, // Starting temperature for Sensor 1
  { sensorId: 2, initialValue: 20.0 }, // Starting temperature for Sensor 2
];

// Utility function to generate the next temperature based on previous value
function generateNextTemperature(previous: number): number {
  const variation = (Math.random() - 0.5) * 0.5; // Variation between -0.25 and +0.25
  let next = previous + variation;

  // Optional: Clamp the temperature to a realistic range
  next = Math.max(15, Math.min(next, 25));

  // Round to one decimal place
  return Math.round(next * 10) / 10;
}

async function generateMeasurements() {
  // Define the date range for measurements, local time
  const startDate = new Date('2024-07-01T00:00:00');
  const endDate = new Date('2024-11-26T23:59:59');
  const measurementInterval = 60 * 60 * 1000; // Every hour

  // Prepare initial temperature values for each sensor
  const sensorValuesMap: { [key: number]: number } = {};
  sensorsInitialValues.forEach(({ sensorId, initialValue }) => {
    sensorValuesMap[sensorId] = initialValue;
  });

  const measurementsToCreate: Prisma.MeasurementCreateManyInput[] = [];

  for (const sensor of sensors) {
    let currentTemp = sensorValuesMap[sensor.id] || 20.0; // Default to 20.0 if not specified

    for (
      let time = startDate.getTime();
      time <= endDate.getTime();
      time += measurementInterval
    ) {
      currentTemp = generateNextTemperature(currentTemp);

      const measurement = {
        value: currentTemp,
        createdAt: new Date(time),
        sensorId: sensor.id,
      };

      measurementsToCreate.push(measurement);
    }
  }

  return measurementsToCreate;
}

async function main() {
  // Clean up the existing database
  await prisma.measurement.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.microcontroller.deleteMany();
  await prisma.paddock.deleteMany();

  // Seed paddocks
  for (const paddock of paddocks) {
    await prisma.paddock.create({
      data: paddock,
    });
  }

  // Reset auto-increment sequence for paddocks
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Paddock"', 'id'), COALESCE(MAX(id), 1)) FROM "Paddock";`;

  // Seed microcontrollers
  for (const microcontroller of microcontrollers) {
    await prisma.microcontroller.create({
      data: microcontroller,
    });
  }

  // Reset auto-increment sequence for microcontrollers
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Microcontroller"', 'id'), COALESCE(MAX(id), 1)) FROM "Microcontroller";`;

  // Seed sensors
  for (const sensor of sensors) {
    await prisma.sensor.create({
      data: sensor,
    });
  }

  // Reset auto-increment sequence for sensors
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Sensor"', 'id'), COALESCE(MAX(id), 1)) FROM "Sensor";`;

  // Seed measurements
  const measurementsToCreate = await generateMeasurements();
  await prisma.measurement.createMany({
    data: measurementsToCreate,
  });

  console.log('Database has been seeded with patterned measurements. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
