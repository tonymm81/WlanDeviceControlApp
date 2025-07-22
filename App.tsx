
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { PropsWithChildren } from 'react';
import { Device } from "./types";
//import the components
import HomeScreen from './components/home';
import PulpView from './components/pulpView';
import SocketView from './components/socketView';
import TableAdjustment from './components/tableAdjusment';
import { fetchDevices, postDeviceState } from './services/api';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { serializeDevices } from './utils/serializeDevices';

type RootStackParamList = {
  Home: undefined;
  PulpView: { deviceKey: string; deviceData: any }; // Navigation props
  SocketView: { deviceKey: string; deviceData: any };
  TableAdjustment: { deviceKey: string; deviceData: any };
};

const Stack = createStackNavigator<RootStackParamList>();


const App = () => {
  const [data, setData] = useState<Record<string, Device>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    setTimeout(() => loadData(), 1500);
  }, []);
  const loadData = async () => {
    try {
      const devices = await fetchDevices();
      console.log('🕵️‍♂️ RAW GET data:', JSON.stringify(devices, null, 2));
      setData(devices);
    } catch (err) {
      setError('Error loading data');
    } finally {
      setIsLoading(false);
    }
     
  };
 const toggleDevice = async (key: string) => {
    // Optimistinen update UI:ssä
    setData(prev => ({
      ...prev,
      [key]: { ...prev[key], isOn: !prev[key].isOn }
    }));

    // Muunnetaan juuri tämä yksi laite array‐muotoon
    const single: Record<string, any[]> = {
      [key]: serializeDevices({ [key]: { ...data[key], isOn: !data[key].isOn } })[key]
    };

    try {
      await postDeviceState(single);
    } catch (err) {
      console.error('POST failed:', err);
    } finally {
      // Haetaan aina serverin virallinen data, niin rakenne pysyy tallella
      await loadData();
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
                                {props => (
                                  <HomeScreen
                                    {...props}
                                    data={data}
                                    isLoading={isLoading}
                                    error={error}
                                    toggleDevice={toggleDevice}
                                  />
                                )}
</Stack.Screen>
        <Stack.Screen name="PulpView" component={PulpView} options={{ title: "Wlan pulps" }} />
        <Stack.Screen name="SocketView" component={SocketView} options={{ title: "wlan outlet" }} />
        <Stack.Screen name="TableAdjustment" component={TableAdjustment} options={{ title: "Adjust desk" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
