#include <U8g2lib.h>
#include "OLEDDisplay.h"
#include "Common.h"

/*
U8g2 instance with 270-degree rotation

U8G2_R0 = no rotation
U8G2_R1 = 90 degree rotation
U8G2_R2 = 180 degree rotation
U8G2_R3 = 270 degree rotation
*/ 
U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(
    U8G2_R3,
    /* clock=*/ OLED_SCL_PIN,
    /* data=*/ OLED_SDA_PIN,
    /* reset=*/ OLED_RST_PIN
);

namespace OLEDDisplay {

void init() {
    Serial.println("[OLED] Initializing OLED display...");
    u8g2.begin();
    u8g2.clearDisplay();
    u8g2.setFont(u8g2_font_6x12_tr); // Medium-sized font
    Serial.println("[OLED] OLED display initialized.");
}

void clear() {
    u8g2.clearDisplay();
}

int displayText(const String& text, int y, bool clearBuffer) {
    if (clearBuffer) {
        u8g2.clearBuffer();
    }

    u8g2.setFont(u8g2_font_6x12_tr);

    int maxWidth = u8g2.getDisplayWidth();
    int lineHeight = u8g2.getMaxCharHeight();
    if (y == 0) {
        y = lineHeight;
    }

    String line;
    for (int i = 0; i < text.length(); i++) {
        line += text[i];
        int lineWidth = u8g2.getStrWidth(line.c_str());

        if (lineWidth > maxWidth) {
            int lastSpace = line.lastIndexOf(' ');
            if (lastSpace != -1) {
                String toDraw = line.substring(0, lastSpace);
                u8g2.drawStr(0, y, toDraw.c_str());
                line = line.substring(lastSpace + 1);
            } else {
                u8g2.drawStr(0, y, line.c_str());
                line = "";
            }
            y += lineHeight;
        }
    }

    if (line.length() > 0) {
        u8g2.drawStr(0, y, line.c_str());
        y += lineHeight;  // Increment y after the last line
    }

    if (clearBuffer) {
        u8g2.sendBuffer();
    }

    return y;
}

void displayDataAndStatus(int controllerId, float value, int sensorId, const String& status) {
    u8g2.clearBuffer();

    u8g2.setFont(u8g2_font_6x12_tr);

    int lineHeight = u8g2.getMaxCharHeight();
    int y = lineHeight;

    // Prepare the text lines with abbreviated labels
    String line1 = "Ctrl ID: " + String(controllerId);
    String line2 = "Sens ID: " + String(sensorId);
    String line3 = "Value: " + String(value);
    String line4 = "Status: " + status;

    // Display each line using displayText to handle wrapping
    y = displayText(line1, y);  // Update y after each call
    y = displayText(line2, y);
    y = displayText(line3, y);
    y = displayText(line4, y);

    u8g2.sendBuffer();  // Update the display after all lines are drawn
}

}
