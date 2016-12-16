---
title: weather_and_location_01
timestamp: 2016-12-16T15:04:34.3973575+01:00
---

hi
* greeting

Hi!
* greeting

^ Let me check the weather for you.
* prompt/weather_city

^ Which city are you interested in?
* prompt/weather_city

[vancouver](city)
* ask_current_weather/conditions

< The current temperature is [15](temperature) °C and [sunny](condition) in [Vancouver](city), [CA](country#code)
* provide_weather/current

where is that
* ask_current_weather/location

< [Vancouver](city), [CA](country#code) is located at latitude [15.6](latitude), longitude [30.2](longitude)
* provide_weather/location
