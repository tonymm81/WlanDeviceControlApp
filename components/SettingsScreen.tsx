import React, { useEffect, useState  } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { fetchSettings, loadSettings, saveSettings } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';


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
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ loadData }) => {

  const [settings, setSettings] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
  React.useCallback(() => {
    setIsLoading(true);
    fetchSettings()
      .then(res => setSettings(res.saveList))
      .finally(() => setIsLoading(false));
  }, [])
);



  const handleLoad = (name: string, index: number) => {
  loadSettings({ name, index }).then(res => {
    console.log('Ladattu:', res);
    // Päivitä laitteet tai siirry takaisin
  });
};

  const handleSave = () => {
  if (selectedSlot !== null && newName) {
    saveSettings(newName, 'distance_from_floor', selectedSlot)
      .then(() => {
        console.log('Tallennettu!');
        setSelectedSlot(null);
        setNewName('');
        return fetchSettings(); // Haetaan uudet tiedot
      })
      .then(res => setSettings(res.saveList)) // Päivitetään lista
      .catch(err => console.error('Tallennus epäonnistui:', err));
      loadData();
  }
};


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
      </View  >
      <Button title="save settings" onPress={handleSave} />
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
}
});


export default SettingsScreen;

