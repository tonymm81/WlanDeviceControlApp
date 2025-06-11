
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { PropsWithChildren } from 'react';

//import the components
import HomeScreen from './components/home';
import PulpView from './components/pulpView';
import SocketView from './components/socketView';
import TableAdjustment from './components/tableAdjusment';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type RootStackParamList = {
  Home: undefined;
  PulpView: { deviceKey: string; deviceData: any }; // Navigation props
  SocketView: { deviceKey: string; deviceData: any };
  TableAdjustment: { deviceKey: string; deviceData: any };
};

const Stack = createStackNavigator<RootStackParamList>();

// Navigointijärjestelmä
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PulpView" component={PulpView} options={{ title: "Lamppu" }} />
        <Stack.Screen name="SocketView" component={SocketView} options={{ title: "Pistorasia" }} />
        <Stack.Screen name="TableAdjustment" component={TableAdjustment} options={{ title: "Pöytä" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
