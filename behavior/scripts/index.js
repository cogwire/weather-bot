'use strict'

const getCurrentWeather = require('./lib/getCurrentWeather')

const firstOfEntityRole = function (message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

exports.handle = function handle(client) {
  const collectCity = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().weatherCity)
    },

    extractInfo() {
      const city = firstOfEntityRole(client.getMessagePart(), 'city')
      if (city) {
        client.updateConversationState({
          weatherCity: city,
        })
        console.log('User wants the weather in:', city.value)
      }
    },

    prompt() {
      client.addResponse('prompt/weather_city')
      client.done()
    },
  })

  const provideWeather = client.createStep({
    satisfied() {
      return false
    },

    prompt(callback) {
      const environment = client.getCurrentApplicationEnvironment()
      getCurrentWeather(environment.weatherAPIKey, client.getConversationState().weatherCity.value, resultBody => {
        if (!resultBody || resultBody.cod !== 200) {
          console.log('Error getting weather.')
          callback()
          return
        }

        console.log('Weather API call successful: ' + JSON.stringify(resultBody))

        const weatherDescription = (
          resultBody.weather.length > 0 ?
            resultBody.weather[0].description :
            null
        )

        const weatherData = {
          temperature: Math.round(resultBody.main.temp),
          condition: weatherDescription,
          city: resultBody.name,
          country: resultBody.sys.country,
          location: {
            longitude: resultBody.coord.lon,
            latitude: resultBody.coord.lat
          }
        }

        client.updateConversationState({
          latestWeatherData: weatherData,
        })

        console.log('latestWeatherData:', weatherData)
        client.addResponse('provide_weather/current', weatherData)
        client.done()

        callback()
      })
    },
  })

  const provideWeatherLocation = client.createStep({
    satisfied() {
      return false
    },

    prompt(callback) {
      const environment = client.getCurrentApplicationEnvironment()
      var latest = client.getConversationState().latestWeatherData
      if (!latest) {
        console.log('No cached weather data available')
        callback()
        return
      }

      console.log('sending location from cached latestWeatherData:', weatherData)
      client.addResponse('provide_weather/location', weatherData)
      client.done()

      callback()
    },
  })

  client.runFlow({
    classifications: {},
    streams: {
      main: 'getWeather',
      getWeather: [collectCity, provideWeather, provideWeatherLocation],
    }
  })
}
