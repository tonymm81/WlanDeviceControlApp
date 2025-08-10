import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';
import { Device } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
  deviceKey: string;
  device: Device;
  onUpdate: (partial: Partial<Device>) => void;
};

const TableAdjustment: React.FC<Props> = ({
  navigation, deviceKey, device, onUpdate
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const [desiredHeight, setDesiredHeight] = useState<number>(device.height ?? 70);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    setDesiredHeight(device.height ?? 70);
    setConfirmed(false);
  }, [device]);

  const handleConfirm = () => {
    onUpdate({ height: desiredHeight });// lets post the new table level to rasbperri pi
    console.log('📤 Confirm height:', desiredHeight);
    setConfirmed(true);
  };

  const trackColor = isDark ? '#BB86FC' : '#6200EE';
  const thumbColor = isDark ? '#BB86FC' : '#6200EE';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#000000ff' }]}>
      <Text style={[styles.label, { color: isDark ? '#fff' : '#e9e6e6ff' }]}>
        Nykyinen korkeus: {device.height} cm
      </Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={60}
        maximumValue={120}
        step={1}
        value={desiredHeight}
        onValueChange={setDesiredHeight}
        minimumTrackTintColor={trackColor}
        maximumTrackTintColor="#ccc"
        thumbTintColor={thumbColor}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#fff7f7ff' }]}>
        Haluttu korkeus: {desiredHeight} cm
      </Text>

      <View style={styles.button}>
        <Button title="Adjust Table" onPress={handleConfirm} color={trackColor} />
      </View>

      {confirmed && (
        <Text style={[styles.confirmation, { color: trackColor }]}>
          Desk level updated
        </Text>
      )}

      <View style={styles.button}>
        <Button title="Takaisin" onPress={() => navigation.navigate('Home')} color="#888" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
  },
  confirmation: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TableAdjustment;