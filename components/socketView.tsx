import React from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// navigation parameterrs
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

  return (
    <View>
      <Text>Socket name: {deviceKey}</Text>
            <Text>brightness: {deviceData[1]?.brightness}</Text>
            <Text>color tempereture: {deviceData[1]?.colortemp}</Text>
    </View>
  );
};

export default SocketView;
