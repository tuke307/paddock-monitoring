#include "Common.h"
#include "WiFiConnector.h"
#include <WiFi.h>


void WiFiConnector::connect() {
    Serial.println();
    Serial.print("[WiFi] Connecting to ");
    Serial.println(WIFI_SSID);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    int tryDelay = 500;
    int numberOfTries = 20;

    while (WiFi.status() != WL_CONNECTED && numberOfTries-- > 0) {
        delay(tryDelay);
        Serial.print(".");
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println();
        Serial.println("[WiFi] Connected to WiFi!");
        Serial.print("[WiFi] IP address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println();
        Serial.println("[WiFi] Failed to connect to WiFi!");
    }
}
