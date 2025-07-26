import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, StyleSheet,ListRenderItemInfo, Button, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Device } from "../types";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';
//import { Button } from '@mui/material';
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

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  data: Record<string, Device>;
  isLoading: boolean;
  error: string | null;
  toggleDevice: (deviceKey: string) => void;
  loadData : () => void;
};

const Home: React.FC<HomeScreenProps> = ({
  navigation,
  data,
  isLoading,
  error,
  toggleDevice,
  loadData
}) => {
 

  if (isLoading) {
    return <View style={styles.card}>
  <ActivityIndicator size="large" color="#007AFF" />
  <Text style={styles.loading}>Loading data...</Text>
</View>
;
  }
  
  if (error) {
    return ( <View style={styles.card}>
      <Text style={styles.error}>{error}</Text>
      <Button title="Reload" onPress={() => loadData()} />
    </View>
)
  }

  

  const navigate = (key: string, dev: Device) => {
    switch (dev.type) {
      case 'lamp':   return navigation.navigate('PulpView', { deviceKey: key, deviceData: dev });
      case 'socket': return navigation.navigate('SocketView', { deviceKey: key, deviceData: dev });
      case 'desk':   return navigation.navigate('TableAdjustment', { deviceKey: key, deviceData: dev });
      default:       return null;
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<[string, Device]>) => {
    const [key, dev] = item;
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.infoArea}
          onPress={() => navigate(key, dev)}
        >
          <Text style={styles.name}>
            {dev.name === 'distance_from_floor'
              ? 'Sähköpöydän korkeus'
              : dev.name}
          </Text>
          {dev.type === 'desk' ? (
            <Text style={styles.details}>Korkeus: {dev.height} cm</Text>
          ) : (
            <>
              <Text style={styles.details}>IP: {dev.ip}</Text>
              <Text style={styles.details}>Tyyppi: {dev.type}</Text>
            </>
          )}
        </TouchableOpacity>

        {dev.type !== 'desk' && (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: dev.isOn ? '#00C853' : '#212121' },
            ]}
            onPress={() => toggleDevice(key)}
          >
            <Text style={styles.buttonText}>{dev.isOn ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(data)}
        keyExtractor={([k]) => k}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    alignItems: 'center',
  },
  infoArea: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#FFFFFF',
  },
  error: {
    flex: 1,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#FF5252',
  },
});
export default Home;