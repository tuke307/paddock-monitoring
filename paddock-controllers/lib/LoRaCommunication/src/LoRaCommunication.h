#ifndef LORACOMMUNICATION_H
#define LORACOMMUNICATION_H

#include <Arduino.h>

namespace LoRaCommunication {

void init();
void loop();

#if defined(ROLE_SENDER)
bool sendMessage(String& message);
#elif defined(ROLE_RECEIVER)
bool isMessageAvailable();
String getMessage();
#endif

}

#endif // LORACOMMUNICATION_H
