/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

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

function App(): React.JSX.Element {
  const [data, setData] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError("Virhe datan haussa!");
        console.error("Fetch error:", err);
      } 
      finally {
      setIsLoading(false); // Merkitään lataus valmiiksi
    }
    };

    fetchData();
  }, []);
  if (isLoading) {
  return <Text style={styles.error}>Ladataan dataa...</Text>;
  }
  const toggleDevice = async (deviceKey: string) => {
    const updatedData = { ...data };

    // Tarkistetaan, onko kyseessä lamppu vai pistorasia
    if (updatedData[deviceKey][2] === 24686) {
      updatedData[deviceKey][1].pwr = updatedData[deviceKey][1].pwr === 1 ? 0 : 1;
    } else {
      updatedData[deviceKey][1] = !updatedData[deviceKey][1];
    }

    setData(updatedData);

    // Lähetetään päivitetty JSON Flaskiin
    try {
      await fetch(POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify( updatedData ),
      });
    } catch (err) {
      console.error("POST error:", err);
    }
  };

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.title}>Laitteet</Text>

    {error && <Text style={styles.error}>{error}</Text>}

    {data && Object.keys(data).length > 0 ? (
      <FlatList
        data={Object.entries(data)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const [deviceKey, deviceData] = item;
          const isLamp = deviceData[2] === 24686;
          const isOn = isLamp ? deviceData[1].pwr === 1 : deviceData[1];

          return (
            <View style={styles.deviceContainer}>
              <Text style={styles.deviceName}>{deviceKey}</Text>
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
      <Text style={styles.error}>Ladataan dataa...</Text> // 🔥 Näytetään latausteksti
    )}
  </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  error: { fontSize: 16, color: 'red', marginBottom: 10 },
  deviceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1 },
  deviceName: { fontSize: 18 },
  button: { padding: 10, borderRadius: 5 },
  buttonText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
});

export default App;
