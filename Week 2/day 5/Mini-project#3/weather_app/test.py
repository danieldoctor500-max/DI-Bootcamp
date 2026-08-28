from pyowm.owm import OWM

owm = OWM("44903cd889c9f2c41befc45ed2c044a2")
mgr = owm.weather_manager()

observation = mgr.weather_at_place("Paris,FR")
weather = observation.weather

print("Status:", weather.status)
print("Detailed:", weather.detailed_status)
print("Temperature (C):", weather.temperature("celsius"))