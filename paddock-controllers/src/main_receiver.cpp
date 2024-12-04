#include <Arduino.h>
#include <ArduinoJson.h>
#include "Common.h"
#include "ApiClient.h"
#include "WiFiConnector.h"
#include "LoRaCommunication.h"
#include "OLEDDisplay.h"


void setup() {
    Serial.begin(115200);

    // Initialize OLED display
    OLEDDisplay::init();
    OLEDDisplay::displayText("Initializing...", 0, true);
    delay(1000);

    // Initialize Wi-Fi connection
    WiFiConnector::connect();

    // Initialize LoRa communication
    LoRaCommunication::init();

    // Initialize API client
    ApiClient::init();

    OLEDDisplay::displayText("Waiting for messages...", 0, true);
    delay(1000);
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
        int sensorId;

        // Assuming the message is JSON formatted
        JsonDocument doc;
        DeserializationError error = deserializeJson(doc, message);
        if (error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            OLEDDisplay::displayText("JSON Error");
            return;
        }

        value = doc["value"].as<float>();
        sensorId = doc["sensorId"].as<int>();

        // Send data to API
        bool success = ApiClient::sendMeasurement(value, sensorId);

        String statusMessage = success ? "API Success" : "API Failed";
        Serial.println(statusMessage);
        OLEDDisplay::displayDataAndStatus(CONTROLLER_ID, value, sensorId, statusMessage);
    }

    delay(100);
}
