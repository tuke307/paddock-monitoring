-- DropForeignKey
ALTER TABLE "Measurement" DROP CONSTRAINT "Measurement_sensorId_fkey";

-- DropForeignKey
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_microcontrollerId_fkey";

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_microcontrollerId_fkey" FOREIGN KEY ("microcontrollerId") REFERENCES "Microcontroller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
