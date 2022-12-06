import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import Main from './src/pages/Main';
import utilities from './tailwind.json';

LogBox.ignoreLogs([]);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* @ts-ignore (TODO: remove) */}
        <TailwindProvider utilities={utilities}>
          <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
          <Main />
        </TailwindProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
