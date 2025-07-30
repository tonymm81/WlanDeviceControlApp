import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Button, Alert, useColorScheme
} from 'react-native';
import Slider from '@react-native-community/slider';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Device } from '../types';

type RootStackParamList = {
  Home: undefined;
  PulpView: { deviceKey: string; deviceData: any[] };
};

type Props = {
  route: RouteProp<RootStackParamList, 'PulpView'>;
  navigation: StackNavigationProp<RootStackParamList, 'PulpView'>;
  deviceKey: string;
  device: Device;
  onToggle: () => void;
  onUpdate: (partial: Partial<Device>) => void;
};

const PulpView: React.FC<Props> = ({
  route, navigation, deviceKey, device,onToggle, onUpdate
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
   const [colorTemp, setColorTemp] = useState<number>(device.colortemp ?? 3500);
  const [brightness, setBrightness] = useState<number>(device.brightness ?? 0);
  const [colormode, setColorMode] = useState<number>(device.bulb_colormode ?? 0);
  
  const [isOn, setIsOn] = useState<boolean>(device.isOn ?? false);

  useEffect(() => {
    setBrightness(device.brightness ?? 0);
    setColorMode(device.bulb_colormode ?? 0);
    setColorTemp(device.colortemp ?? 3500);
    setIsOn(device.isOn ?? false);
  }, [device]);

  const handleBrightness = (val: number) => {
    setBrightness(val);
    onUpdate({ brightness: val });
  };

  const handleColorMode = (val: number) => {
    setColorMode(val);
    onUpdate({ bulb_colormode: val });
  };
   const handleColorTemp = (val: number) => {
    setColorTemp(val);
    onUpdate({ colortemp: val });
  };

  const togglePower = () => {
    const next = !isOn;
    setIsOn(next);
    onUpdate({ isOn: next });
  };

   const trackColor = isDark ? '#BB86FC' : '#6200EE';
   const thumbColor = isDark ? '#BB86FC' : '#6200EE';

    return (
    <View style={[styles.container, styles.darkBg]}>
      {/* Virtakytkin */}
      <View style={styles.buttonWrapper}>
        <Button
          title={isOn ? 'Turn OFF' : 'Turn ON'}
          onPress={() => {
            setIsOn(!isOn);
            onToggle();
          }}
          color="#2196F3"
        />
      </View>

      {/* Brightness-slider */}
      <Text style={[styles.label, styles.darkText]}>
        Brightness: {brightness}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={255}
        step={1}
        value={brightness}
        onValueChange={setBrightness}
        onSlidingComplete={(val) => handleBrightness(val)}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#888"
        thumbTintColor="#2196F3"
      />

      {/* Color mode -slider */}
      <Text style={[styles.label, styles.darkText]}>
        Color mode: {colormode}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={5}
        step={1}
        value={colormode}
        onValueChange={setColorMode}
        onSlidingComplete={(val1) => handleColorMode(val1)}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#888"
        thumbTintColor="#2196F3"
      />
       <Text style={[styles.label, isDark && styles.darkText]}>
        Color Temp: {colorTemp} K
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={2000}
        maximumValue={6500}
        step={100}
        value={colorTemp}
        onValueChange={setColorTemp}
        onSlidingComplete={handleColorTemp}
        minimumTrackTintColor={trackColor}
        maximumTrackTintColor="#888"
        thumbTintColor={thumbColor}
      />

      {/* Back-painike */}
      <View style={styles.buttonWrapper}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
          color="#FF5722"
        />
      </View>
    </View>
  );
};
export default PulpView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkBg: {
    backgroundColor: '#333',      
  },
  darkText: {
    color: '#EEE',               
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 20,           
  },
  buttonWrapper: {
    marginVertical: 10,          
  },
});