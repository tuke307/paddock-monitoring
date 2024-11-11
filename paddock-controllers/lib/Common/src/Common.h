#ifndef COMMON_H
#define COMMON_H

// Wi-Fi credentials (used by the receiver)
#define WIFI_SSID "your-ssid"
#define WIFI_PASSWORD "your-password"

// API endpoint (used by the receiver)
#define API_URL "http://API_URL:API_PORT/api/v1/development/measurements/create"

// LoRa communication parameters (common to all devices)
#define RF_FREQUENCY 915000000
#define TX_OUTPUT_POWER 14
#define LORA_BANDWIDTH 0
#define LORA_SPREADING_FACTOR 12
#define LORA_CODINGRATE 1
#define LORA_PREAMBLE_LENGTH 8
#define LORA_SYMBOL_TIMEOUT 0
#define LORA_FIX_LENGTH_PAYLOAD_ON false
#define LORA_IQ_INVERSION_ON false

#endif // COMMON_H
