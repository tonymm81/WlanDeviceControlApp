import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, useColorScheme } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SocketView: { deviceKey: string; deviceData: any };
  Home: undefined;
};
type SocketViewProps = {
  route: RouteProp<RootStackParamList, 'SocketView'>;
  navigation: StackNavigationProp<RootStackParamList, 'SocketView'>;
};


const SocketView: React.FC<SocketViewProps> = ({ route, navigation }) => {
  const { deviceKey, deviceData } = route.params;
  const scheme = useColorScheme();  
  const isDark = true;
  const [isOn, setIsOn] = useState<boolean>(deviceData?.isOn ?? false);

  useEffect(() => {
    setIsOn(deviceData?.isOn ?? false);
  }, [deviceData]);

  const togglePower = () => { // Tämä vain päivittää UI:n – varsinainen komento lähetetään myöhemmin 
  setIsOn(!isOn);
    console.log("Socket toggled:", deviceKey, "→", !isOn);
  };
  return (<View style={[styles.container, isDark && styles.darkBg]}> 
  <Text style={[styles.title, isDark && styles.darkText]}> Socket: {deviceKey} </Text> {/* Näytetään halutessa dataa */} 
  <Text style={[styles.info, isDark && styles.darkText]}> Brightness: {deviceData?.brightness ?? "N/A"} </Text> 
  <Text style={[styles.info, isDark && styles.darkText]}> Color temperature: {deviceData?.colortemp ?? "N/A"} </Text> {/* ON/OFF -painike */} 
  <View style={styles.buttonWrapper}> <Button title={isOn ? "Turn OFF" : "Turn ON"} onPress={togglePower} color="#2196F3" /> 
  </View>
{/* Takaisin */} 
<View style={styles.buttonWrapper}> 
  <Button title="Back" onPress={() => navigation.goBack()} color="#FF5722" /> </View> 
  </View> ); }; 
  export default SocketView; 
  const styles = StyleSheet.create({ 
    container: { flex: 1, padding: 16, }, 
    darkBg: { backgroundColor: "#333", }, 
    darkText: { color: "#EEE", }, 
    title: { fontSize: 20, marginBottom: 12, }, 
    info: { fontSize: 16, marginBottom: 6, },
    buttonWrapper: { marginVertical: 12, },
   });