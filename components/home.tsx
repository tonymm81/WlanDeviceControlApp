import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//import { fetch } from 'react-native-ssl-pinning';
//import { fetch } from 'react-native';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

const API_URL = 'http://192.168.68.201:5000/data'; // Flask-palvelimen URL
const POST_URL = 'http://192.168.68.201:5000/receive'; // Flask API laitteen tilan muutoksiin
const Stack = createStackNavigator();

type RootStackParamList = {
  Home: undefined; // Etusivu
  PulpView: { deviceKey: string; deviceData: any }; // Lamppu
  SocketView: { deviceKey: string; deviceData: any }; // Pistorasia
  TableAdjustment: { deviceKey: string; deviceData: any }; // Pöydän korkeus
};

type HomeScreenProps = { navigation: StackNavigationProp<RootStackParamList, 'Home'> };


const Home = ({ navigation }: HomeScreenProps) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {// lets make the GET request to flaskserver
      try {
        const response = await fetch(API_URL);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        try{
          const response = await fetch(API_URL);
          const jsonData = await response.json();
          setData(jsonData);
        }catch{
          setError("Error getting data!");
        }
        setError("Error getting data!");
        console.error("Fetch error:", err);
      }
      finally {
        setIsLoading(false); //Now its loaded
      }
    };

    setTimeout(() => fetchData(), 1500);
  }, []);



  if (isLoading) {
    return <Text style={styles.error}>Ladataan dataa...</Text>;
  }
  const toggleDevice = async (deviceKey: string) => {
    const updatedData = { ...data };

    if (updatedData[deviceKey][2] === 24686) {
      updatedData[deviceKey][1].pwr = updatedData[deviceKey][1].pwr === 1 ? 0 : 1;
    } else {
      updatedData[deviceKey][1] = !updatedData[deviceKey][1];
    }

    setData(updatedData);

    try {// lets make the POST request to flask server
      await fetch(POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch (err) {
       try {// lets make the POST request to flask server
        await fetch(POST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
       } catch (err){

        }
      console.error('POST error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Wlan devices </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {data && Object.keys(data).length > 0 ? (
        <FlatList
          data={Object.entries(data)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            const [deviceKey, deviceData] = item;
            const isLamp = deviceData[2] === 24686;
            const isSocket = deviceData[2] === 30073 || deviceData[2] === 42348 || deviceData[2] === 32000;
            const isTable = deviceKey === 'distance_from_floor';
            const isOn = isLamp ? deviceData[1].pwr === 1 : deviceData[1];

            return (
              <View style={styles.deviceContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (isLamp) navigation.navigate('PulpView', { deviceKey, deviceData });
                    else if (isSocket) navigation.navigate('SocketView', { deviceKey, deviceData });
                    else if (isTable) navigation.navigate('TableAdjustment', { deviceKey, deviceData });
                  }}
                >
                  <Text style={styles.deviceName}>{deviceKey}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: isOn ? 'green' : 'red' }]}
                  onPress={() => toggleDevice(deviceKey)}
                >
                  <Text style={styles.buttonText}>{isOn ? 'ON' : 'OFF'}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <Text style={styles.error}>Loading...</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'black' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  error: { fontSize: 16, color: 'red', marginBottom: 10 },
  deviceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderRadius: 10, backgroundColor: '#333' },
  deviceName: { fontSize: 18, color: 'white' },
  button: { padding: 10, borderRadius: 5 },
  buttonText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
});

export default Home;