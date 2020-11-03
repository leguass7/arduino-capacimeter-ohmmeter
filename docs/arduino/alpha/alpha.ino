#include <ArduinoJson.h>
#include <Gaussian.h>
#include <GaussianAverage.h>

#define SENSOR A0
#define OutOhmmeter 7
#define baseR 2180.0F
#define vDigitalOut 4.97F

float voltageInput = 0.0;
float R1 = 0.0;
unsigned long sartTime;

StaticJsonDocument<128> doc;

GaussianAverage movingAverageOhmmeter(5);
GaussianAverage movingVoltageInput(2);

float ohmmeter();
int averageAnalogInput();

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(50);
  pinMode(SENSOR, INPUT);
  
  pinMode(OutOhmmeter, OUTPUT);
  digitalWrite(OutOhmmeter, HIGH);
  
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  long voltage = averageAnalogInput(); 
  String command = "";
  
  voltageInput = (voltage * vDigitalOut) / 1023.0;
  doc["voltage"] = voltageInput;
  doc["A0"] = voltage;

  if (Serial.available() > 0) {
    command = Serial.readStringUntil('\n');
  }
  
  
  doc["r1"] = ohmmeter();
  
  
  String test = "";
  serializeJson(doc, test);
  Serial.println(test);
  Serial.println(doc.memoryUsage());
  delay(250);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(250);
  digitalWrite(LED_BUILTIN, LOW);
}

int averageAnalogInput() {
   unsigned char i;
   // int volt_store = 0;
   for (i = 0; i < 10; i++) {
    movingVoltageInput += analogRead(SENSOR);
    // volt_store += analogRead(SENSOR);
    delay(20);
   }          
   movingVoltageInput.process();    
   return movingVoltageInput.mean;
   //return (volt_store / 10.0);                     
};

float ohmmeter(){
  // movingAverageOhmmeter
  //movingAverageResistor.process();
  if(voltageInput <= 0){
    R1 = 0;
  } else {
    R1 = ((baseR * 5) / voltageInput) - baseR;  
  }
  
  return R1;
}
