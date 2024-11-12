-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('TEMPERATURE');

-- CreateTable
CREATE TABLE "Paddock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paddock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Microcontroller" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "manufacturer" TEXT,
    "masterChip" TEXT,
    "loraChip" TEXT,
    "serialNumber" TEXT,
    "macAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paddockId" INTEGER,

    CONSTRAINT "Microcontroller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SensorType" NOT NULL DEFAULT 'TEMPERATURE',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "microcontrollerId" INTEGER NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "sensorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paddock_name_key" ON "Paddock"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Microcontroller_name_key" ON "Microcontroller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Microcontroller_serialNumber_key" ON "Microcontroller"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Microcontroller_macAddress_key" ON "Microcontroller"("macAddress");

-- AddForeignKey
ALTER TABLE "Microcontroller" ADD CONSTRAINT "Microcontroller_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_microcontrollerId_fkey" FOREIGN KEY ("microcontrollerId") REFERENCES "Microcontroller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
