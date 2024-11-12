#include "LoRaCommunication.h"
#include "Common.h"
#include <RadioLib.h>

namespace LoRaCommunication {

// Create an instance of the SX1262 class
SX1262 radio = new Module(LORA_CS_PIN, LORA_IRQ_PIN, LORA_RST_PIN, LORA_BUSY_PIN);

// Variables for receiving data
#if defined(ROLE_RECEIVER)
volatile bool receivedFlag = false;
String receivedMessage = "";

void setFlag(void) {
    receivedFlag = true;
}
#endif

void init() {
    Serial.println("[LoRa] Initializing LoRa Radio...");

    int state = radio.begin(
        LORA_FREQUENCY,
        LORA_BANDWIDTH, 
        LORA_SPREADING_FACTOR,
        LORA_CODING_RATE,
        RADIOLIB_SX126X_SYNC_WORD_PRIVATE, // Private sync word
        LORA_POWER,
        LORA_PREAMBLE_LENGTH,
        LORA_TCXO_VOLTAGE
    );

    if (state != RADIOLIB_ERR_NONE) {
        Serial.print("[LoRa] Failed to initialize radio: ");
        Serial.println(state);
        while (true);
    }

    Serial.println("[LoRa] Radio initialized.");

    #if defined(ROLE_RECEIVER)
    // Set up the receive interrupt
    radio.setDio1Action(setFlag);
    // Start listening for incoming transmissions
    state = radio.startReceive();
    if (state != RADIOLIB_ERR_NONE) {
        Serial.print("[LoRa] Failed to start receiver: ");
        Serial.println(state);
        while (true);
    }
    #endif
}

void loop() {
    #if defined(ROLE_RECEIVER)
    if (receivedFlag) {
        receivedFlag = false;

        int state = radio.readData(receivedMessage);
        if (state == RADIOLIB_ERR_NONE) {
            Serial.print("[LoRa] Received message: ");
            Serial.println(receivedMessage);
        } else {
            Serial.print("[LoRa] Failed to read data: ");
            Serial.println(state);
        }

        // Restart listening
        radio.startReceive();
    }
    #endif
}

#if defined(ROLE_SENDER)
bool sendMessage(String& message) {
    Serial.print("[LoRa] Sending message: ");
    Serial.println(message);

    int state = radio.transmit(message);
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println("[LoRa] Message sent successfully.");
        return true;
    } else {
        Serial.print("[LoRa] Failed to send message: ");
        Serial.println(state);
        return false;
    }
}
#elif defined(ROLE_RECEIVER)
bool isMessageAvailable() {
    return !receivedMessage.isEmpty();
}

String getMessage() {
    String msg = receivedMessage;
    receivedMessage = "";
    return msg;
}
#endif

}
