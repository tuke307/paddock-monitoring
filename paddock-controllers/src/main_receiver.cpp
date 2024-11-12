#include <Arduino.h>
#include "LoRaCommunication.h"
#include "WiFiConnector.h"
#include "ApiClient.h"
#include <ArduinoJson.h>
#include "Common.h"

void setup() {
    Serial.begin(115200);

    // Initialize Wi-Fi connection
    WiFiConnector::connect();

    // Initialize LoRa communication
    LoRaCommunication::init();

    // Initialize API client
    ApiClient::init();
}

void loop() {
    // Process LoRa events
    LoRaCommunication::loop();

    // Check for received LoRa messages
    if (LoRaCommunication::isMessageAvailable()) {
        String message = LoRaCommunication::getMessage();
        Serial.print("Received message: ");
        Serial.println(message);

        // Parse the message to extract value, timestamp, and sensorId
        float value;
        String timestamp;
        int sensorId;

        // Assuming the message is JSON formatted
        JsonDocument doc;
        DeserializationError error = deserializeJson(doc, message);
        if (error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            return;
        }

        value = doc["value"].as<float>();
        timestamp = doc["timestamp"].as<String>();
        sensorId = doc["sensorId"].as<int>();

        // Send data to API
        bool success = ApiClient::sendMeasurement(value, timestamp, sensorId);
        if (success) {
            Serial.println("Data sent to API successfully.");
        } else {
            Serial.println("Failed to send data to API.");
        }
    }

    delay(100);
}
