#ifndef OLEDDISPLAY_H
#define OLEDDISPLAY_H

#include <Arduino.h>

namespace OLEDDisplay {

void init();
void clear();
int displayText(const String& text, int y = 0, bool clearBuffer = false);
void displayDataAndStatus(int controllerId, float value, int sensorId, const String& status);

}

#endif // OLEDDISPLAY_H
