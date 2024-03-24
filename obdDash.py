import socketio
import random 
import time
import json
import obd
import obdUtils
import time
import re
import os
from dotenv import load_dotenv
from pathlib import Path
import paho.mqtt.publish as publish

load_dotenv(dotenv_path=Path("./.env.obd-dash"))

SENSOR_TYPE = 'OBD'
ERROR = 'ERR'
RETRY_INTERVAL = 1 #Delay in seconds when retrying to connect to node server

delay = 0.3 #Delay in seconds before sending data. This can be decreased, but .3s seems to be the fastest
            #that the pi can display on the web dashboard. Otherwise the web page updating begins lagging

idleTime = 0.0 #Time the engine is idling in seconds

currentDtcCodes = []
dtcCodesChanged = False

numTries = 1

# emitDtcCodes function to emit currentDtcCodes
def emitDtcCodes():
    global dtcCodesChanged
    dtcCmd = obd.commands.GET_DTC
    response = connection.query(dtcCmd)
    dtcCodes = response.value
    
    for i in dtcCodes: #add new codes if they don't exist
        dtcCodesChanged = True
        if dtcCodes[i] not in currentDtcCodes:
            currentDtcCodes.append(dtcCodes[i])
            
    for i in currentDtcCodes: #remove any codes that were resolved
        dtcCodesChanged = True
        if (currentDtcCodes[i] not in dtcCodes):
            currentDtcCodes.pop(i)
                    
    # Client emits currentDtcCodes with dtcData as event name
    if dtcCodesChanged:
        sio.emit('dtcData', currentDtcCodes())
        dtcCodesChanged = False

# emitTelemetry function to emit the data
def emitTelemetry():
    global idleTime
    
    while True:
        try:
            # fuel system status
            fuelSystemStatusCmd = obd.commands.FUEL_STATUS
            fuelSystemStatusResp = connection.query(fuelSystemStatusCmd)
            varFuelSystemStatus = str(fuelSystemStatusResp.value)

            # engine rpm
            engineRpmCmd = obd.commands.RPM
            engineRpmResp = connection.query(engineRpmCmd)
            varEngineRpm = engineRpmResp.value.magnitude

            # vehicle speed
            vehicleSpeedCmd = obd.commands.SPEED # select an OBD command (sensor)
            vehicleSpeedResp = connection.query(vehicleSpeedCmd) # send the command, and parse the response
            # varVehicleSpeed = str(vehicleSpeedResp.value.magnitude)
            varVehicleSpeed = vehicleSpeedResp.value.magnitude

            # throttle position
            throttlePositionCmd = obd.commands.THROTTLE_POS
            throttlePositionResp = connection.query(throttlePositionCmd)
            varThrottlePosition = throttlePositionResp.value.magnitude

            # engine coolant temperature
            engineCoolantTemperatureCmd = obd.commands.COOLANT_TEMP
            engineCoolantTemperatureResp = connection.query(engineCoolantTemperatureCmd)
            varEngineCoolantTemperature = engineCoolantTemperatureResp.value.magnitude

            # short term fuel trim
            shortTermFuelTrimCmd = obd.commands.SHORT_FUEL_TRIM_1
            shortTermFuelTrimResp = connection.query(shortTermFuelTrimCmd)
            varShortTermFuelTrim = shortTermFuelTrimResp.value.magnitude
            
            # long term fuel trim
            longTermFuelTrimCmd = obd.commands.LONG_FUEL_TRIM_1
            longTermFuelTrimResp = connection.query(longTermFuelTrimCmd)
            varLongTermFuelTrim = longTermFuelTrimResp.value.magnitude

            # intake air temperature
            intakeAirTemperatureCmd = obd.commands.INTAKE_TEMP
            intakeAirTemperatureResp = connection.query(intakeAirTemperatureCmd)
            varIntakeAirTemperature = intakeAirTemperatureResp.value.magnitude

            # mass air flow
            massAirFlowCmd = obd.commands.MAF
            massAirFlowResp = connection.query(massAirFlowCmd)
            varMassAirFlow = massAirFlowResp.value.magnitude

            # catalyst temperature
            catalystTemperatureCmd = obd.commands.CATALYST_TEMP_B1S1
            catalystTemperatureResp = connection.query(catalystTemperatureCmd)
            varCatalystTemperature = catalystTemperatureResp.value.magnitude

            # intake manifold pressure
            intakeManifoldPressureCmd = obd.commands.INTAKE_PRESSURE
            intakeManifoldPressureResp = connection.query(intakeManifoldPressureCmd)
            varIntakeManifoldPressure = intakeManifoldPressureResp.value.magnitude 
                       
            runTimeCmd = obd.commands.RUN_TIME
            runTimeResp = connection.query(runTimeCmd)
            runTime = str(runTimeResp.value)
            
            if (float(varVehicleSpeed) < .1):
                idleTime += delay
            
            data = {
                'varFuelSystemStatus': varFuelSystemStatus,
                'varEngineRpm': varEngineRpm,
                'varVehicleSpeed': varVehicleSpeed,
                'varThrottlePosition': varThrottlePosition,
                'varEngineCoolantTemperature': varEngineCoolantTemperature,
                'varShortTermFuelTrim': varShortTermFuelTrim,
                'varLongTermFuelTrim': varLongTermFuelTrim,
                'varIntakeAirTemperature': varIntakeAirTemperature,
                'varMassAirFlow': varMassAirFlow,
                'varCatalystTemperature': varCatalystTemperature,
                'varIntakeManifoldPressure': varIntakeManifoldPressure,
                'runTime': runTime,
                'idleTime': idleTime}
            # sio.emit('data', json.dumps(data))
            print(json.dumps(data))

            publish.single(os.getenv("HYPERBASE_MQTT_TOPIC"), json.dumps({
                "project_id": os.getenv("PROJECT_ID"),
                "token_id": os.getenv("TOKEN_ID"),
                "token": os.getenv("TOKEN"),
                "user": {
                    "collection_id": os.getenv("USER_COLLECTION_ID"),
                    "id": os.getenv("USER_ID")
                },
                "collection_id": os.getenv("COLLECTION_ID"),
                "data": {
                    "car_id": os.getenv("CAR_ID"),
                    "fuel_system_status": varFuelSystemStatus,
                    "engine_rpm": varEngineRpm,
                    "vehicle_speed": varVehicleSpeed,
                    "throttle_position": varThrottlePosition,
                    "engine_coolant_temperature": varEngineCoolantTemperature,
                    "short_term_fuel_trim": varShortTermFuelTrim,
                    "long_term_fuel_trim": varLongTermFuelTrim,
                    "intake_air_temperature": varIntakeAirTemperature,
                    "mass_air_flow": varMassAirFlow,
                    "catalyst_temperature": varCatalystTemperature,
                    "intake_manifold_pressure": varIntakeManifoldPressure,
                    "run_time": runTime,
                    "idle_time": idleTime
                }
            }), hostname=os.getenv("HYPERBASE_MQTT_HOST"))
            
            emitDtcCodes()
            time.sleep(delay)
            
        except Exception as ex: #logs any errors
            print("There is an exception that makes emitTelemetry failed")
            errorLog = obdUtils.createLogMessage(ERROR, SENSOR_TYPE, type(ex).__name__, ex.args)
            print(errorLog)
            sio.emit('log', json.dumps(errorLog)) # will only work if exception is unrelated to node server connection
            continue

connection = obd.OBD()

while True: #loop until a connection is made with the server instead of immediately exiting
    try:
        print("OBD connection established!")
        sio = socketio.Client()
        sio.connect('http://localhost:4000')
        print("Socket IO has been connected to port 4000")
        emitTelemetry()
        print("emitTelemetry sudah berhasil")
        break

    except Exception as ex:
            print("There is an exception that makes emitTelemetry failed")
            errorLog = obdUtils.createLogMessage(ERROR, SENSOR_TYPE, type(ex).__name__, ex.args)
            print("Start of errorLog")
            print(errorLog)
            print("End of errorLog")
            sio.emit('log', json.dumps(errorLog)) # will only work if exception is unrelated to node server connection
            sleep(RETRY_INTERVAL)
            continue
        

# The client registers event handler functions with the sio.event
@sio.event
def connect():
    print("Connected to node server!")
    emitTelemetry()