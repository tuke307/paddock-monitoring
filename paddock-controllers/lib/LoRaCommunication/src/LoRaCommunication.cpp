#include <Common.h> 
#include "LoRaCommunication.h"
#include "LoRaWan_APP.h"


namespace LoRaCommunication {

// Use parameters from Common.h
// (Constants are defined in Common.h)

// LoRa event handlers
static RadioEvents_t RadioEvents;

#if defined(ROLE_RECEIVER)
static char rxpacket[256];
static bool lora_idle = true;
static bool messageAvailable = false;
static String receivedMessage;

void OnRxDone(uint8_t* payload, uint16_t size, int16_t rssi, int8_t snr) {
    memcpy(rxpacket, payload, size);
    rxpacket[size] = '\0';
    Radio.Sleep();
    Serial.printf("\r\nReceived packet: \"%s\" with RSSI %d, length %d\r\n", rxpacket, rssi, size);
    receivedMessage = String(rxpacket);
    messageAvailable = true;
    lora_idle = true;
}

void OnTxDone(void) {
    // Not used in receiver
}

#elif defined(ROLE_SENDER)
static char txpacket[256];
static bool lora_busy = false;

void OnTxDone(void) {
    Serial.println("Transmission completed");
    Radio.Sleep();
    lora_busy = false;
}

void OnRxDone(uint8_t* payload, uint16_t size, int16_t rssi, int8_t snr) {
    // Not used in sender
}

#endif

void init() {
    Mcu.begin(HELTEC_BOARD, SLOW_CLK_TPYE);

    RadioEvents.TxDone = OnTxDone;
    RadioEvents.RxDone = OnRxDone;

    Radio.Init(&RadioEvents);
    Radio.SetChannel(RF_FREQUENCY);

#if defined(ROLE_SENDER)
    Radio.SetTxConfig(MODEM_LORA, TX_OUTPUT_POWER, 0, LORA_BANDWIDTH,
                      LORA_SPREADING_FACTOR, LORA_CODINGRATE,
                      LORA_PREAMBLE_LENGTH, LORA_FIX_LENGTH_PAYLOAD_ON,
                      true, 0, 0, LORA_IQ_INVERSION_ON, 3000);
#elif defined(ROLE_RECEIVER)
    Radio.SetRxConfig(MODEM_LORA, LORA_BANDWIDTH, LORA_SPREADING_FACTOR,
                      LORA_CODINGRATE, 0, LORA_PREAMBLE_LENGTH,
                      LORA_SYMBOL_TIMEOUT, LORA_FIX_LENGTH_PAYLOAD_ON,
                      0, true, 0, 0, LORA_IQ_INVERSION_ON, true);
    lora_idle = true;
#endif
}

void loop() {
#if defined(ROLE_RECEIVER)
    if (lora_idle) {
        lora_idle = false;
        Serial.println("Entering RX mode");
        Radio.Rx(0);
    }
    Radio.IrqProcess();
#elif defined(ROLE_SENDER)
    Radio.IrqProcess();
#endif
}

#if defined(ROLE_SENDER)
bool sendMessage(const String& message) {
    if (lora_busy) {
        Serial.println("LoRa is busy");
        return false;
    }

    lora_busy = true;
    message.toCharArray(txpacket, sizeof(txpacket));
    Serial.print("Sending packet: ");
    Serial.println(txpacket);

    Radio.Send((uint8_t*)txpacket, strlen(txpacket));
    return true;
}

#elif defined(ROLE_RECEIVER)
bool isMessageAvailable() {
    if (messageAvailable) {
        messageAvailable = false; // Reset flag for next message
        return true;
    }
    return false;
}

String getMessage() {
    return receivedMessage;
}
#endif

}
