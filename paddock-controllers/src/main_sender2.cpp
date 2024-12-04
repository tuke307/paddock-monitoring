#include <Arduino.h>
#include <ArduinoJson.h>
#include "Common.h"
#include "LoRaCommunication.h"
#include "OLEDDisplay.h"
#include "TemperatureSensor.h"


void setup() {
    Serial.begin(115200);

    // Initialize OLED display
    OLEDDisplay::init();
    OLEDDisplay::displayText("Initializing...", 0, true);
    delay(1000);

    // Initialize LoRa communication
    LoRaCommunication::init();

    // Initialize temperature sensor using build flag
    TemperatureSensor::init(TEMP_SENSOR_PIN);

    // Seed the random number generator
    randomSeed(analogRead(34)); // Using a different analog pin
}

void loop() {
    // Read temperature
    float temperature = -127.0;
    if (TemperatureSensor::isConnected()) {
        temperature = TemperatureSensor::readTemperature();
        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.println(" °C");
    } else {
        Serial.println("Sensor is not connected.");
    }

    // Prepare the data to send
    JsonDocument doc;
    doc["value"] = temperature;
    doc["sensorId"] = CONTROLLER_ID;

    String message;
    serializeJson(doc, message);

    // Random delay to avoid collision (0 to 5 seconds)
    unsigned long randomDelay = random(0, 5000);
    delay(randomDelay);

    // Send the message
    bool success = LoRaCommunication::sendMessage(message);
    String statusMessage = success ? "LoRa Success" : "LoRa Failed";
    Serial.println(statusMessage);
    OLEDDisplay::displayDataAndStatus(CONTROLLER_ID, doc["value"], doc["sensorId"], statusMessage);

    // Wait for a minute before sending the next message
    delay(60000 - randomDelay);
}
