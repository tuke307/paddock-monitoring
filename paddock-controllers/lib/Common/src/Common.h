#ifndef COMMON_H
#define COMMON_H

// Wi-Fi credentials (used by the receiver)
#define WIFI_SSID "your-ssid"
#define WIFI_PASSWORD "your-password"

// API endpoint (used by the receiver)
#define API_URL "http://API_URL:API_PORT/api/v1/development/measurements/create"

// LoRa communication parameters (common to all devices)
#define LORA_FREQUENCY 868.0  // MHz (Adjust according to your region)
#define LORA_BANDWIDTH 125.0  // kHz
#define LORA_SPREADING_FACTOR 7
#define LORA_CODING_RATE 5    // 4/5

// SX1262 pin configuration for Heltec WiFi LoRa 32 (adjust if necessary)
#define LORA_CS_PIN    18
#define LORA_RST_PIN   14
#define LORA_IRQ_PIN   26
#define LORA_BUSY_PIN  25

#endif // COMMON_H
