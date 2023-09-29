/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';

import WeatherScreen from './src/screens/WeatherScreen';

function App(): JSX.Element {
  return (
    <SafeAreaView className="bg-yellow-400">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <WeatherScreen />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;
