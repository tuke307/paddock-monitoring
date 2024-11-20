#ifndef COMMON_H
#define COMMON_H

#include "Secrets.h"

// Wi-Fi credentials moved to secrets file

// API endpoint (used by the receiver)
#define API_URL "https://api-paddockmonitoring-prod.azurewebsites.net:443/api/v1/production/measurements/create"

// LoRa communication parameters (common to all devices)
#define LORA_FREQUENCY          868.0   // MHz
#define LORA_BANDWIDTH          125.0   // kHz
#define LORA_SPREADING_FACTOR   7       // 128 chips/symbol
#define LORA_CODING_RATE        5       // 4/5
#define LORA_POWER              15      // power Output power in dBm. Defaults to 10 dBm.
#define LORA_PREAMBLE_LENGTH    8       // LoRa preamble length in symbols. Defaults to 8 symbols.
#define LORA_TCXO_VOLTAGE       1.6     // TCXO reference voltage to be set on DIO3. Defaults to 1.6 V.

// SX1262 pin configuration for Heltec WiFi LoRa 32 V3
// https://github.com/JJJS777/Hello_World_RadioLib_Heltec-V3_SX1262
#define LORA_CS_PIN    8  // NSS Arduino pin to be used as chip select.
#define LORA_IRQ_PIN   14 // DIO1 Arduino pin to be used as interrupt/GPIO.
#define LORA_RST_PIN   12 // NRST Arduino pin to be used as hardware reset for the module.
#define LORA_BUSY_PIN  13 // BUSY Arduino pin to be used as additional interrupt/GPIO.

// OLED display pins (adjust according to your hardware)
#define OLED_SCL_PIN 18 // GPIO for SCL
#define OLED_SDA_PIN 17 // GPIO for SDA
#define OLED_RST_PIN 21 // GPIO for RST (if connected)

#endif
