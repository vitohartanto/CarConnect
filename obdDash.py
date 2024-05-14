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
import datetime;
from hyperbase import Hyperbase
from hyperbase import HyperbaseREST

load_dotenv(dotenv_path=Path("./.env.obd-dash"))

hyperbase = Hyperbase(
    os.getenv("HYPERBASE_MQTT_HOST"),
    os.getenv("HYPERBASE_MQTT_PORT"),
    os.getenv("HYPERBASE_MQTT_CLIENT_ID"),
    os.getenv("HYPERBASE_MQTT_TOPIC"),
    os.getenv("PROJECT_ID"),
    os.getenv("TOKEN_ID"),
    os.getenv("TOKEN"),
    os.getenv("USER_COLLECTION_ID"),
    os.getenv("USER_ID")
)
hyperbase_rest = HyperbaseREST(
    os.getenv("HYPERBASE_BASE"),
    os.getenv("PROJECT_ID"),
    os.getenv("TOKEN_ID"),
    os.getenv("TOKEN"),
)
hyperbase_rest.signIn(
    os.getenv("USER_COLLECTION_ID"),
    {
        "email": os.getenv("USER_EMAIL"),
        "password": os.getenv("USER_PASSWORD")
    }
)
hyperbase_rest_car = hyperbase_rest.setCollection(
    os.getenv("CAR_COLLECTION_ID")
)

SENSOR_TYPE = 'OBD'
ERROR = 'ERR'
RETRY_INTERVAL = 1 #Delay in seconds when retrying to connect to node server

delay = 1 #Delay in seconds before sending data. This can be decreased, but .3s seems to be the fastest
            #that the pi can display on the web dashboard. Otherwise the web page updating begins lagging

idleTime = 0.0 #Time the engine is idling in seconds

currentDtcCodes = []

numTries = 1

# emitDtcCodes function to emit currentDtcCodes
def emitDtcCodes():
    dtcCmd = obd.commands.GET_DTC
    response = connection.query(dtcCmd)
    dtcCodes = response.value

    dtcJSON = json.dumps(dtcCodes)

    # Get the current date and time in UTC timezone
    current_time_utc = datetime.datetime.now()

    # Convert the current time to your timezone (GMT+7)
    gmt_offset = datetime.timedelta(hours=7)  # Offset for GMT+7
    current_time_gmt7 = current_time_utc + gmt_offset

    # Convert the datetime object to the desired string format
    timestamp_str = current_time_gmt7.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    
    data = {
        "car_id": os.getenv("CAR_ID"),
        "value": dtcJSON,
        "timestamp": timestamp_str
    }

    #publish data to hyperbase collection DTC Data
    hyperbase.publish(os.getenv("DTC_DATA_COLLECTION_ID"), data)

    print("===DTC DATA===")
    print(json.dumps(data))

# emitTelemetry function to emit the obd data
def emitTelemetry():
    global idleTime

    # Define the optimal ranges for each parameter
    optimal_ranges = {
        "short_term_fuel_trim": (-10, 10),
        "long_term_fuel_trim": (-10, 10),
        "oxygen_sensor": (0.1, 0.9)
    }

    # Track consecutive out-of-range occurrences for each parameter
    out_of_range_counts = {param: 0 for param in optimal_ranges.keys()}
    
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

            # oxygen sensor bank 1 sensor 2
            oxygenSensorBank1Sensor2Cmd = obd.commands.O2_B1S2
            oxygenSensorBank1Sensor2Resp = connection.query(oxygenSensorBank1Sensor2Cmd)
            varOxygenSensorBank1Sensor2 = oxygenSensorBank1Sensor2Resp.value.magnitude 

            # Get the current date and time in UTC timezone
            current_time_utc = datetime.datetime.now()

            # Convert the current time to your timezone (GMT+7)
            gmt_offset = datetime.timedelta(hours=7)  # Offset for GMT+7
            current_time_gmt7 = current_time_utc + gmt_offset

            # Convert the datetime object to the desired string format
            timestamp_str = current_time_gmt7.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

            runTimeCmd = obd.commands.RUN_TIME
            runTimeResp = connection.query(runTimeCmd)
            runTime = str(runTimeResp.value)
            
            if (float(varVehicleSpeed) < .1):
                idleTime += delay
            
            data = {
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
                "oxygen_sensor": varOxygenSensorBank1Sensor2,
                "run_time": runTime,
                "idle_time": idleTime,
                "timestamp": timestamp_str
            }

            for param, (min_val, max_val) in optimal_ranges.items():
                value = locals().get(f"var{param.capitalize()}")
                if value is not None and (value < min_val or value > max_val):
                    out_of_range_counts[param] += 1
                else:
                    out_of_range_counts[param] = 0

                if out_of_range_counts[param] >= 10:  # Check if out of range for 10 consecutive times
                    
                    # Notify that the parameter is out of optimal range
                    notification_message = f"{param.replace('_', ' ').title()} is out of optimal range"
                    
                    # Get the current date and time in UTC timezone
                    current_time_utc = datetime.datetime.now()

                    # Convert the current time to your timezone (GMT+7)
                    gmt_offset = datetime.timedelta(hours=7)  # Offset for GMT+7
                    current_time_gmt7 = current_time_utc + gmt_offset

                    # Convert the datetime object to the desired string format
                    timestamp_str = current_time_gmt7.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

                    notifications_data = {
                        "car_id": os.getenv("CAR_ID"),
                        "notifications": notification_message,
                        "fixed_at": timestamp_str,
                        "fixed": false,
                        "timestamp": timestamp_str
                    }
                    # Add logic to send notification to Notifications Page
                    hyperbase.publish(os.getenv("NOTIFICATIONS_DATA_COLLECTION_ID"), notifications_data)

            #publish data to hyperbase collection OBD Data
            hyperbase.publish(os.getenv("OBD_DATA_COLLECTION_ID"), data)


            if connection.is_connected():
                #set car status to active
                hyperbase_rest_car.updateOne(
                    os.getenv("CAR_ID"),
                    {
                        "is_active": True
                    }
                )
            else:
                #set car status to inactive
                hyperbase_rest_car.updateOne(
                    os.getenv("CAR_ID"),
                    {
                        "is_active": False
                    }
                )
            
            

            print("===OBD DATA===")
            print(json.dumps(data))
            
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