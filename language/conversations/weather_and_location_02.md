---
title: getweather_and_location_details
timestamp: 2016-12-16T11:38:50.1040281+01:00
---

hi
* greeting

< Which city would you like a weather report for?
* prompt/weather_city

[oslo](city)
* provide_weather/current

< It is currently [5](temperature) degrees in [Oslo](city), [NO](country_code)
* provide_weather/current

where is that?
* ask_current_weather/location

< The weather station for [Oslo](city), [NO](country_code) is located at longitude [10.75](number/longitude), latitude [59.91](number/latitude).
* provide_weather/location
