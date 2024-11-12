#include <Arduino.h>
#include "LoRaCommunication.h"
#include <ArduinoJson.h>
#include "Common.h"

void setup() {
    Serial.begin(115200);
    // Initialize LoRa communication
    LoRaCommunication::init();

    // Seed the random number generator
    randomSeed(analogRead(0));
}

void loop() {
    // Prepare the data to send
    DynamicJsonDocument doc(256);
    doc["value"] = 22.2; // Replace with actual sensor reading
    doc["timestamp"] = "2020-11-16T00:00:00Z"; // Replace with actual timestamp
    doc["sensorId"] = SENSOR_ID; // SENSOR_ID defined in build_flags

    String message;
    serializeJson(doc, message);

    // Random delay to avoid collision (0 to 5 seconds)
    unsigned long randomDelay = random(0, 5000);
    delay(randomDelay);

    // Send the message
    bool success = LoRaCommunication::sendMessage(message);
    if (success) {
        Serial.println("Message sent successfully");
    } else {
        Serial.println("Failed to send message");
    }

    // Wait for a minute before sending the next message
    delay(60000 - randomDelay);
}
