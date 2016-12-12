---
title: greeting_prompt_current_conditions
timestamp: 2016-12-12T15:14:07.8759307+01:00
---

Hi
* greeting

Hi!
* greeting

^ I'm your weather bot.
* greeting

^ I can let you know about current weather conditions in the city of your choice.
* greeting

< Which city would like a weather report for?
* prompt/weather_city

seattle
* ask_current_weather/conditions

< It is [22](temperature) degrees and [sunny](condition) in [Seattle](condition) at the moment.
* provide_weather/current
