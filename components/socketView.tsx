import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, useColorScheme } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Device } from '../types';


type Props = {
  deviceKey: string;
  device:
  Device; onToggle: () => void;
  navigation: any;
};

const SocketView: React.FC<Props> = ({ deviceKey, device, onToggle, navigation }) => {
  const [isOn, setIsOn] = useState(device.isOn);
  const scheme = useColorScheme();
  const isDark = true;

  useEffect(() => {
    setIsOn(device?.isOn ?? false);
  }, [device]);


  return (
    <View style={[styles.container, isDark && styles.darkBg]}>
      <Text style={[styles.title, isDark && styles.darkText]}>
        Socket: {deviceKey} </Text>
      <Text style={[styles.info, isDark && styles.darkText]}>
        Brightness: {device.brightness ?? "N/A"}
      </Text>
      <Text style={[styles.info, isDark && styles.darkText]}>
        Color temperature: {device.colortemp ?? "N/A"}
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title={isOn ? "Turn OFF" : "Turn ON"} onPress={onToggle}
          color="#2196F3" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Back" onPress={() => navigation.goBack()} color="#FF5722" />
      </View>
    </View>
  );
};
export default SocketView;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  darkBg: { backgroundColor: "#333" },
  darkText: { color: "#EEE" },
  title: { fontSize: 20, marginBottom: 12 },
  info: { fontSize: 16, marginBottom: 6 },
  buttonWrapper: { marginVertical: 12 },
});