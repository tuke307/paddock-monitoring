#include "TemperatureSensor.h"

OneWire* TemperatureSensor::oneWire = nullptr;
DallasTemperature* TemperatureSensor::sensors = nullptr;
bool TemperatureSensor::initialized = false;
DeviceAddress TemperatureSensor::sensorAddress;

void TemperatureSensor::init(int dataPin) {
    if (!initialized) {
        oneWire = new OneWire(dataPin);
        sensors = new DallasTemperature(oneWire);
        sensors->begin();

        if (!sensors->getAddress(sensorAddress, 0)) {
            Serial.println("Unable to find address for the sensor");
        } else {
            Serial.print("Sensor Address: ");
            printAddress(sensorAddress);
            Serial.println();
        }

        sensors->setResolution(sensorAddress, 12);  // Set the precision to 12 bits

        initialized = true;
    }
}

float TemperatureSensor::readTemperature() {
    if (!initialized) return -127.0;

    sensors->requestTemperatures();
    float tempC = sensors->getTempC(sensorAddress);
    return tempC;
}

bool TemperatureSensor::isConnected() {
    if (!initialized) return false;

    sensors->requestTemperatures();
    float temp = sensors->getTempC(sensorAddress);
    return temp != DEVICE_DISCONNECTED_C;
}

void TemperatureSensor::printAddress(DeviceAddress deviceAddress) {
    for (uint8_t i = 0; i < 8; i++) {
        if (deviceAddress[i] < 16) Serial.print("0");
        Serial.print(deviceAddress[i], HEX);
    }
}