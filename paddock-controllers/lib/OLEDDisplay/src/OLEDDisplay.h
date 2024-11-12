#ifndef OLEDDISPLAY_H
#define OLEDDISPLAY_H

#include <Arduino.h>

namespace OLEDDisplay {

void init();
void clear();
void displayText(const String& text);
void displayDataAndStatus(int controllerId, float value, int sensorId, const String& status);

}

#endif // OLEDDISPLAY_H
