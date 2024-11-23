#ifndef TEMPERATURE_SENSOR_H
#define TEMPERATURE_SENSOR_H

#include <OneWire.h>
#include <DallasTemperature.h>

class TemperatureSensor {
public:
    static void init(int dataPin);
    static float readTemperature();
    static bool isConnected();

private:
    static OneWire* oneWire;
    static DallasTemperature* sensors;
    static bool initialized;
    static DeviceAddress sensorAddress;

    static void printAddress(DeviceAddress deviceAddress);
};

#endif