import React from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// navigation parameterrs
type RootStackParamList = {
  TableAdjustment: { deviceKey: string; deviceData: any };
  Home: undefined;
};

type tableAdjusmentProps = {
  route: RouteProp<RootStackParamList, 'TableAdjustment'>;
  navigation: StackNavigationProp<RootStackParamList, 'TableAdjustment'>;
};

const TableAdjustment: React.FC<tableAdjusmentProps> = ({ route, navigation }) => {
  const { deviceKey, deviceData } = route.params;

  return (
    <View>
     <Text>table: {deviceKey}</Text>
           <Text>brightness: {deviceData[1]?.brightness}</Text>
           <Text>color tempereture: {deviceData[1]?.colortemp}</Text>

      
      <Button title="Takaisin kotiin" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default TableAdjustment;




