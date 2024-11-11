#include <Arduino.h>
#include "led_control.h"

void setupLED() {
    pinMode(LED_BUILTIN, OUTPUT); // Set LED pin as output
}

void blinkLED(int delayTime) {
    digitalWrite(LED_BUILTIN, HIGH); // Turn the LED on
    delay(delayTime);                // Wait for the specified time
    digitalWrite(LED_BUILTIN, LOW);  // Turn the LED off
    delay(delayTime);                // Wait for the specified time
}
