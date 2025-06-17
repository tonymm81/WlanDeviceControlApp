import React from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// navigation parameterrs
type RootStackParamList = {
  PulpView: { deviceKey: string; deviceData: any };
  Home: undefined;
};

type PulpViewProps = {
  route: RouteProp<RootStackParamList, 'PulpView'>;
  navigation: StackNavigationProp<RootStackParamList, 'PulpView'>;
};

const PulpView: React.FC<PulpViewProps> = ({ route, navigation }) => {
  const { deviceKey, deviceData } = route.params;

  return (
    <View>
      <Text>Lamp name: {deviceKey}</Text>
      <Text>brightness: {deviceData[1]?.brightness}</Text>
      <Text>color tempereture: {deviceData[1]?.colortemp}</Text>

    
      <Button title="Back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default PulpView;