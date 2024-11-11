#ifndef APICLIENT_H
#define APICLIENT_H

#include <Arduino.h>

namespace ApiClient {

void init();
bool sendMeasurement(float value, const String& timestamp, int sensorId);

}

#endif // APICLIENT_H
