#include <ArduinoJson.h>
#include <Gaussian.h>
#include <GaussianAverage.h>
#include <Thread.h>
#include <ThreadController.h>

#define InOhmmeter A0
#define OutOhmmeter 7
#define baseR 2180.0F
#define vDigitalOut 4.97F

// tx JSON protocol
StaticJsonDocument<128> doc;

// moving averages
GaussianAverage movingAverageOhmmeter(5);
GaussianAverage movingVoltageInput(2);

// threads
Thread thrSender;
Thread thrOhmmeter;
Thread thrReceiver;
ThreadController cpu;

// global variables
float voltageOhmmeter = 0.0;
int ohmmeterAverage = 0;
float R1 = 0.0;
String command = "";

unsigned long sartTime;

// global functions
float ohmmeter();
int averageAnalogInput();
void sendSerialData();
void calculateOhmmeterAverage();
void receiveSerial();


void setup() {
  Serial.begin(9600);
  Serial.setTimeout(50);
  pinMode(InOhmmeter, INPUT);

  pinMode(OutOhmmeter, OUTPUT);
  digitalWrite(OutOhmmeter, HIGH);

  pinMode(LED_BUILTIN, OUTPUT);

  thrSender.setInterval(1000);
  thrSender.onRun(sendSerialData);

  thrOhmmeter.setInterval(500);
  thrOhmmeter.onRun(calculateOhmmeterAverage);

  thrReceiver.setInterval(0);
  thrReceiver.onRun(receiveSerial);

  cpu.add(&thrSender);
  cpu.add(&thrOhmmeter);
  cpu.add(&thrReceiver);
}

void loop() {

  doc["r1"] = ohmmeter();

  // sendSerialData();
  cpu.run();
}

/**
 * Envia dados para porta serial
 */
void sendSerialData(){
  String test = "";

  doc["voltage"] = voltageOhmmeter;
  doc["A0"] = ohmmeterAverage;
  doc["cmd"] = command;
  doc["usage"] = doc.memoryUsage();

  serializeJson(doc, test);
  Serial.println(test);
  // Serial.println();
  digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
};

/**
 * @function calculateOhmmeterAverage
 * - Calcula media movel da entrada analogica
 * - Calcula tensao
 * - Atribui valores
 */
void calculateOhmmeterAverage(){
  movingVoltageInput += analogRead(InOhmmeter);
  movingVoltageInput.process();
  ohmmeterAverage = movingVoltageInput.mean;
  voltageOhmmeter = (ohmmeterAverage * vDigitalOut) / 1023.0;
};

/**
 * @function receiveSerial
 * Recebe comando da porta serial
 */
void receiveSerial(){
  if (Serial.available() > 0) {
    command = Serial.readString();
    // Serial.println(cmd);
  }
};

float ohmmeter(){
  // movingAverageOhmmeter
  //movingAverageResistor.process();
  if(voltageOhmmeter <= 0){
    R1 = 0;
  } else {
    R1 = ((baseR * 5) / voltageOhmmeter) - baseR;
  }

  return R1;
}
