import React, {  useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { fetchSettings, loadSettings, saveSettings, ShutDownPythonServer, UpdateTheDevicesListInServer } from '../services/api';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; 


export const darkTheme = {
  background: '#121212',
  card: '#2C2C2C',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  accent: '#007AFF',
  error: '#FF5252',
};


type SettingsScreenProps = { 
  loadData: () => void; 
  route: RouteProp<RootStackParamList, 'Settings'>; 
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>; 
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ loadData, navigation }) => {

  const [settings, setSettings] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

useFocusEffect(
  React.useCallback(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const res = await fetchSettings();
        setSettings(res.saveList);
      } catch (error) {
        console.error('Virhe asetusten latauksessa:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [])
);



  const handleLoad = async (name: string, index: number) => {
    await loadSettings({ name, index }).then(res => {
      console.log('Ladattu:', res);
      // Päivitä laitteet tai siirry takaisin
    });
  };

  const handleSave = async () => {
    if (selectedSlot !== null && newName) {
      await saveSettings(newName, 'distance_from_floor', selectedSlot)
        .then(() => {
          console.log('Tallennettu!');
          setSelectedSlot(null);
          setNewName('');
          return fetchSettings(); 
        })
        .then(res => setSettings(res.saveList)) // Päivitetään lista
        .catch(err => console.error('Tallennus epäonnistui:', err));
      loadData();
    }
  };

  const handleShutdown = () => {
    ShutDownPythonServer();
  }

  const UpdateDevicesList = async () => {
    await UpdateTheDevicesListInServer();
    await loadData(); // ← tämä päivittää laitelistat App.tsx:ssä 
    navigation.goBack(); // ← valinnainen, jos haluat palata Homeen
  }


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Save the settings</Text>
      <Text style={styles.buttonText}>Choose the settings, what you like to load</Text>
      {isLoading ? (
        <Text style={styles.buttonText}>Loading the settings...</Text>
      ) : (

        settings.map((name, index) => (
          <View key={`slot-${index}`} style={styles.savedButton}>
            <Button title={name} onPress={() => handleLoad(name, index)} color="#444" />
          </View>
        ))
      )}


      <Text style={styles.buttonText}>Or save current setting</Text>
      <TextInput
        style={styles.input}
        placeholder="Give the save name"
        value={newName}
        onChangeText={setNewName}
      />
      <Text style={styles.buttonText}>First, choose the save slot, where you want to save the settings and then give the slot name and hit the save settings button</Text>
      <View style={styles.slotContainer}>

        {[0, 1, 2, 3].map(i => (
          <View key={i} style={styles.slotButton}>
            <Button
              title={`Slot ${i + 1}`}
              onPress={() => setSelectedSlot(i)}
              color={selectedSlot === i ? darkTheme.accent : '#999'}
            />
          </View>
        ))}
      </View >
      <View style={{ marginVertical: 10 }}>
        <Button title="save settings" onPress={handleSave} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="shutdown python server" onPress={handleShutdown} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Refresh the device list in python server" onPress={UpdateDevicesList} />
      </View>
      <View style={styles.buttonWrapper}> 
        <Button title="Back" onPress={() => navigation.goBack()} color="#4a660aff" /> 
          </View> 
          <View style={{ marginVertical: 10 }}> 
            <Button title="Pair new Broadlink device" onPress={() => navigation.navigate('PairDevice')} color="#4a660aff" /> 

            </View>
        </View>
        

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: darkTheme.textPrimary,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: darkTheme.textSecondary,
    color: darkTheme.textPrimary,
    backgroundColor: darkTheme.card,
    padding: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: darkTheme.accent,
    padding: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: darkTheme.textPrimary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  savedButton: {
    marginVertical: 6,
    backgroundColor: darkTheme.card,
    borderRadius: 4,
    overflow: 'hidden',
  },

  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  slotButton: {
    flex: 1,
    marginHorizontal: 4,
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: '#444',
    borderRadius: 6,
    overflow: 'hidden',
  },
      buttonWrapper: { marginVertical: 12, },

});


export default SettingsScreen;

