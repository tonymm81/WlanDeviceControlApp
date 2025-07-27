
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
      //console.log('🕵️‍♂️ RAW GET data:', JSON.stringify(devices, null, 2));
      setData(devices);
    } catch (err) {
      setError('Error loading data');

    } finally {
      setIsLoading(false);
      setError("")
    }

  };
  const toggleDevice = async (key: string) => {

    setData(prev => ({
      ...prev,
      [key]: { ...prev[key], isOn: !prev[key].isOn }
    }));

    //Lets change the device data to array
    const single: Record<string, any[]> = {
      [key]: serializeDevices({ [key]: { ...data[key], isOn: !data[key].isOn } })[key]
    };

    try {
      await postDeviceState(single);
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error('POST failed:', err);
    } finally {
      await new Promise(r => setTimeout(r, 500));
      await loadData();
    }
  };
  const updateDevice = async (key: string, partial: Partial<Device>) => {
  // 1) Muodostetaan uusi dev-olio heti, ei odoteta setData:ta
  setData(prev => {
    const updatedDev = { ...prev[key], ...partial };
    // 2) POST‐payloadin valmistus juuri tästä päivitetyistä tiedoista
    const single = {
      [key]: serializeDevices({ [key]: updatedDev })[key]
    };

    // 3) Lähetä samassa lohkossa
    postDeviceState(single).catch(err => console.error('POST error', err));

    // 4) Palauta uusi data react-stateen
    return { ...prev, [key]: updatedDev };
  });

  // 5) Lopuksi synkkaa filestoren data
  try {
    await loadData();
  } catch {}  
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
              loadData={loadData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="PulpView">
          {props => {
            const key = props.route.params.deviceKey;
            return (
              <PulpView
                {...props}
                deviceKey={key}
                device={data[key]}

                // Virtakytkin
                onToggle={() => toggleDevice(key)}

                // Slider-päivitykset
                onUpdate={(partial) => updateDevice(key, partial)}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="SocketView" component={SocketView} options={{ title: "wlan outlet" }} />
        <Stack.Screen name="TableAdjustment" component={TableAdjustment} options={{ title: "Adjust desk" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
