import React, {useCallback, useEffect} from 'react';
import {Alert, FlatList, Image, Keyboard, View} from 'react-native';
import {OpenWeatherForecastResponseType} from '../types/open-weather-forecast';
import GoodInput from '../components/GoodInput';
import GoodButton from '../components/GoodButton';
import {OpenWeatherCurrentResponseType} from '../types/open-weather-current';
import GoodText from '../components/text/GoodText';
import {useKeyboardIsVisible} from '../hooks/useKeyboardIsVisible';

const API_KEY = '947f8a9d8034c01a8628f4dd02c1e01e';

export default function WeatherScreen() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const keyboardIsVisible = useKeyboardIsVisible();
  const [zipcode, setZipcode] = React.useState<string>('');
  const [currentWeather, setCurrentWeather] =
    React.useState<OpenWeatherCurrentResponseType | null>(null);
  const [forecast, setForecast] =
    React.useState<OpenWeatherForecastResponseType | null>(null);

  const getWeather = useCallback(
    // get the current weather and forecast
    async (type: 'weather' | 'forecast') => {
      setLoading(true);
      Keyboard.dismiss();
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5//${type}?zip=${zipcode}&appid=${API_KEY}&units=imperial`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (type === 'forecast') {
          const forecastResponse: OpenWeatherForecastResponseType =
            await response.json();
          if (forecastResponse.cod === '200') {
            setForecast(forecastResponse);
          } else {
            throw new Error(forecastResponse.message as string);
          }
        } else {
          const currentWeatherResponse: OpenWeatherCurrentResponseType =
            await response.json();
          if (currentWeatherResponse.cod === 200) {
            setCurrentWeather(currentWeatherResponse);
            getWeather('forecast');
          } else {
            throw new Error(currentWeatherResponse.message as string);
          }
        }
      } catch (error: any) {
        Alert.alert('Oh no! ', error.message);
        setLoading(false);
      }
    },
    [zipcode],
  );

  useEffect(() => {
    if (forecast) {
      setLoading(false);
    }
  }, [forecast]);

  const showWeather = currentWeather && forecast && !loading;

  return (
    <View
      className={'p-3 items-center w-full h-full '}
      onTouchStart={() => {
        keyboardIsVisible && Keyboard.dismiss();
      }}>
      {loading && <GoodText variant="subtitle">Loading...</GoodText>}
      <View
        className={`p-0 items-center w-full h-full ${
          keyboardIsVisible && 'opacity-20'
        }`}>
        {showWeather && (
          <CurrentWeatherViewer currentWeather={currentWeather} />
        )}

        {showWeather && <ForecastViewer forecast={forecast} />}
      </View>

      <View
        className="w-full items-center bg-yellow-400 mt-auto"
        onTouchStart={e => e.stopPropagation()}>
        <GoodInput
          label="Zipcode"
          value={zipcode}
          onChangeText={setZipcode}
          onSubmitEditing={() => getWeather('weather')}
          keyboardType="number-pad"
          returnKeyType="go"
          maxLength={5}
          placeholder="Enter a zipcode"
        />
        <GoodButton onPress={() => getWeather('weather')}>
          Get Weather
        </GoodButton>
      </View>
    </View>
  );
}

function CurrentWeatherViewer({
  currentWeather,
}: {
  currentWeather: OpenWeatherCurrentResponseType;
}) {
  return (
    <View className="p-4 w-full justify-center items-center">
      <GoodText variant="title">{currentWeather.name}</GoodText>
      <GoodText variant="subtitle">
        {currentWeather.main.temp.toFixed()}&deg;
      </GoodText>
      <View className="flex flex-row items-center">
        <Image
          className="w-16 h-16"
          source={{
            uri: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`,
          }}
        />
        <GoodText variant="alternate">
          {currentWeather.weather[0].description}
        </GoodText>
      </View>
    </View>
  );
}

function ForecastViewer({
  forecast,
}: {
  forecast: OpenWeatherForecastResponseType;
}) {
  const shortList = forecast.list.filter(
    (
      item, // filter to 3pm only for the weather icon for that day
    ) => item.dt_txt.includes('15:00:00'),
  );
  const cleanerList: OpenWeatherForecastResponseType['list'] = [];

  shortList.forEach(item => {
    // find min and max temp for the day
    let minTemp = item.main.temp_min;
    let maxTemp = item.main.temp_max;
    forecast.list.forEach(item2 => {
      if (item2.dt_txt.split(' ')[0] === item.dt_txt.split(' ')[0]) {
        if (item2.main.temp_min < minTemp) {
          minTemp = item2.main.temp_min;
        }
        if (item2.main.temp_max > maxTemp) {
          maxTemp = item2.main.temp_max;
        }
      }
    });
    // add to cleaner list
    cleanerList.push({
      ...item,
      main: {
        ...item.main,
        temp_min: minTemp,
        temp_max: maxTemp,
      },
    });
  });

  return (
    <View className="w-full">
      <FlatList
        key={forecast.city.name}
        horizontal
        data={cleanerList}
        renderItem={({item}) => (
          <View className="p-3 rounded-md bg-zinc-800 items-center w-32 mr-1">
            <View className="flex flex-row w-full justify-start mb-4">
              <GoodText variant="stat-title">
                {new Date(item.dt * 1000)
                  .toLocaleString('en-US', {
                    weekday: 'short',
                  })
                  .slice(0, 3)}
              </GoodText>
              <Image
                className="w-8"
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                }}
              />
            </View>

            <GoodText variant="body">
              {item.main.temp_min.toFixed()}&deg; -{' '}
              {item.main.temp_max.toFixed()}&deg;
            </GoodText>
            <View className="mt-auto" />
            <GoodText variant="description">
              {item.weather[0].description}
            </GoodText>
          </View>
        )}
        keyExtractor={item => item.dt.toString()}
      />
    </View>
  );
}
