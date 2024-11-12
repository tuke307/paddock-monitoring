#include <Common.h>
#include "ApiClient.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>


namespace ApiClient {

void init() {
    // Any initialization if needed
}

bool sendMeasurement(float value, const String& timestamp, int sensorId) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;

        http.begin(API_URL);
        http.addHeader("Content-Type", "application/json");

        JsonDocument doc;
        doc["value"] = value;
        doc["timestamp"] = timestamp;
        doc["sensorId"] = sensorId;

        String requestBody;
        serializeJson(doc, requestBody);

        int httpResponseCode = http.POST(requestBody);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
            http.end();
            return true;
        } else {
            Serial.print("Error on sending POST: ");
            Serial.println(httpResponseCode);
            http.end();
            return false;
        }
    } else {
        Serial.println("WiFi not connected");
        return false;
    }
}

}
