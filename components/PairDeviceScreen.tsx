import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { pairNewDevice } from '../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PairDevice'>;
  route: RouteProp<RootStackParamList, 'PairDevice'>;
};

const PairDeviceScreen: React.FC<Props> = ({ navigation }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handlePair = async () => {
    setStatus('Pairing device...');
    try {
      const result = await pairNewDevice(ssid, password);
      setStatus(`Device paired: ${JSON.stringify(result)}`);
    } catch (err) {
      setStatus('Pairing failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pair New Broadlink Device</Text>

      <TextInput
        style={styles.input}
        placeholder="WiFi SSID"
        value={ssid}
        onChangeText={setSsid}
      />

      <TextInput
        style={styles.input}
        placeholder="WiFi Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Start Pairing" onPress={handlePair} />

      <Text style={styles.status}>{status}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Back" onPress={() => navigation.goBack()} color="#FF5722" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2C2C2C',
    color: '#fff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
  },
  status: {
    color: '#ccc',
    marginTop: 20,
  },
});

export default PairDeviceScreen;
