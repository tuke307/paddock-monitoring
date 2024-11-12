#include <U8g2lib.h>
#include "OLEDDisplay.h"
#include "Common.h"

// U8g2 instance
// Adjust the constructor according to your display type and communication interface
U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ OLED_SCL_PIN, /* data=*/ OLED_SDA_PIN, /* reset=*/ OLED_RST_PIN);

namespace OLEDDisplay {

// Spinner state variables
const int SPINNER_DOTS = 8;           // Number of dots in the spinner
int spinnerStep = 0;                   // Current step in the spinner animation
const int spinnerRadius = 6;           // Radius of the spinner circle
const int spinnerCenterX = 120;        // X-coordinate of spinner center (top-right corner)
const int spinnerCenterY = 8;          // Y-coordinate of spinner center

void init() {
    Serial.println("[OLED] Initializing OLED display...");
    u8g2.begin();
    u8g2.clearDisplay();
    u8g2.setFont(u8g2_font_5x7_tr);
    Serial.println("[OLED] OLED display initialized.");
}

void clear() {
    u8g2.clearDisplay();
}

void displayText(const String& text) {
    u8g2.clearBuffer();
    u8g2.drawStr(0, 24, text.c_str());
    u8g2.sendBuffer();
}

void displayDataAndStatus(int controllerId, float value, int sensorId, const String& status) {
    u8g2.clearBuffer();

    u8g2.setCursor(0, 16);
    u8g2.print("Controller Id: ");
    u8g2.print(controllerId);

    // Display the sensor ID and value on one line
    u8g2.setCursor(0, 48);
    u8g2.print("Sensor (Id ");
    u8g2.print(sensorId); 
    u8g2.print(", Value ");
    u8g2.print(value);
    u8g2.print(")");

    u8g2.setCursor(0, 64);
    u8g2.print("Status: ");
    u8g2.print(status);

    u8g2.sendBuffer();
}

}
