import socketio
import random 
import time
import json
import obd
import obdUtils
import time
import re

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

            # # oxygen sensor bank 1 sensor 1
            # oxygenSensorBank1Sensor1Cmd = obd.commands.O2_B1S1
            # oxygenSensorBank1Sensor1Resp = connection.query(oxygenSensorBank1Sensor1Cmd)
            # varOxygenSensorBank1Sensor1 = oxygenSensorBank1Sensor1Resp.value

            # # oxygen sensor bank 2 sensor 2
            # oxygenSensorBank2Sensor2Cmd = obd.commands.O2_B2S2
            # oxygenSensorBank2Sensor2Resp = connection.query(oxygenSensorBank2Sensor2Cmd)
            # varOxygenSensorBank2Sensor2 = oxygenSensorBank2Sensor2Resp.value

            # # mass air flow
            # massAirFlowCmd = obd.commands.MAX_MAF
            # massAirFlowResp = connection.query(massAirFlowCmd)
            # varMassAirFlow = massAirFlowResp.value

            # catalyst temperature
            catalystTemperatureCmd = obd.commands.CATALYST_TEMP_B1S1
            catalystTemperatureResp = connection.query(catalystTemperatureCmd)
            varCatalystTemperature = catalystTemperatureResp.value.magnitude

            # # fuel type
            # fuelTypeCmd = obd.commands.FUEL_TYPE
            # fuelTypeResp = connection.query(fuelSystemStatusCmd)
            # varFuelType = fuelTypeResp.value

            # # engine oil temperature
            # engineOilTemperatureCmd = obd.commands.OIL_TEMP
            # engineOilTemperatureResp = connection.query(engineOilTemperatureCmd)
            # varEngineOilTemperature = engineOilTemperatureResp.value

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
                
                
                'varCatalystTemperature': varCatalystTemperature,
                
                'varIntakeManifoldPressure': varIntakeManifoldPressure,
                'runTime': runTime,
                'idleTime': idleTime}
            sio.emit('data', json.dumps(data))
            print(json.dumps(data))

            # 'varOxygenSensorBank1Sensor1': varOxygenSensorBank1Sensor1,
            # 'varOxygenSensorBank2Sensor2': varOxygenSensorBank2Sensor2,
            # 'varMassAirFlow': varMassAirFlow,
            # 'varFuelType': varFuelType,
            # 'varEngineOilTemperature': varEngineOilTemperature,
            
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
        emitDtcCodes()
        print("emitTelemetry & emiteDtcCodes sudah berhasil")
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