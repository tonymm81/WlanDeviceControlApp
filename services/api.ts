import axios from 'axios';
import { Device } from '../types';
import { parseDevices } from '../utils/parseDevices';
import { SavedSettings } from '../types';
import * as testJson from './devices.json';

const API_URL = 'http://192.168.68.201:5000/data';
const API_URL_setting = 'http://192.168.68.201:5000/SavedSettings';
const POST_URL = 'http://192.168.68.201:5000/receive';
const POST_URL_Load = 'http://192.168.68.201:5000/LoadSettingsFromPhone';
const POST_URL_Save = 'http://192.168.68.201:5000/SaveSettingsFromPhone';
const API_URL_ShutDown =  'http://192.168.68.201:5000/ShutDownPythonServer';
const API_URL_UpdateDevices =  'http://192.168.68.201:5000/UpdateTheDevicesJson';
const POST_URL_Pair = 'http://192.168.68.201:5000/pair_device'
const API_URL_ShutDown_weatherstation =  'http://192.168.68.200:5000/shutdown';
const testing = false;

export const fetchDevices = async (): Promise<Record<string, Device>> => {
  try {
    if (!testing){
      const response = await axios.get(API_URL, { timeout: 15000 });
      return parseDevices(response.data);
    }else{
      return parseDevices(testJson);
    }
  } catch (Servererror:any) {
    //console.error('[fetchDevices] error:', error);
    console.error('GET error:', Servererror.toJSON?.() || Servererror);
     throw new Error('Error GET device Data');
  }
};

export const fetchSettings = async (): Promise<SavedSettings> => {//version 109
  try {
    const response = await axios.get(API_URL_setting, { timeout: 15000 });
    return { saveList: response.data }; // oletetaan että data on string[]
  } catch (Servererror: any) {
    console.error('GET error:', Servererror.toJSON?.() || Servererror);
    throw new Error('Error GET device Data');
  }
};

export const ShutDownPythonServer = async () =>{
  try{
      const response = await axios.get(API_URL_ShutDown, { timeout: 15000 });
      console.log(response)
      
  }catch (error : any){
    throw new Error('Error shutting down');
  }
}

export const ShutDownWeatherstation = async (): Promise<void> => {
  try {
    const payload = { cmd: "shutdown" };
    const config = {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    };

    const response = await axios.post(API_URL_ShutDown_weatherstation, payload, config);

    // odotetaan että server vastaa 202 Accepted kun shutdown käynnistetään
    if (response.status === 202) {
      console.log("Shutdown request accepted:", response.data);
      return;
    }

    // jos server palauttaa jotain muuta, logataan ja heitetään virhe
    console.warn("Unexpected shutdown response:", response.status, response.data);
    throw new Error("Unexpected response from shutdown endpoint");
  } catch (error: any) {
    // parempi virheloki ja käyttäjäystävällinen virheilmoitus
    console.error("ShutDownWeatherstation error:", error.toJSON?.() || error);
    throw new Error("Error shutting down weatherstation");
  }
};
// debug‑funktio, kutsu dev‑consolesta
export const testReachability = async (url = 'http://192.168.68.200:5000') => {
  try {
    const r = await axios.get(url + '/', { timeout: 5000 });
    console.log('Reachable:', r.status, r.data);
  } catch (e:any) {
    console.error('Reachability failed:', { message: e.message, code: e.code, response: e.response?.status });
    if (e.request) console.error('Request object present (sent, no response):', e.request);
    if (e.response) console.error('Response data:', e.response.data);
  }
};


export const UpdateTheDevicesListInServer = async () =>{
  try{
      const response = await axios.get(API_URL_UpdateDevices, { timeout: 15000 });
      console.log("get request for updating the devices", response)
      
  }catch (error : any){
    throw new Error('Error updating the devices list');
  }
}


export const saveSettings = async (
  entry: string,
  measure: string,
  slotIndex: number
): Promise<any> => {
  try {
    const response = await axios.post(
      POST_URL_Save,
      { entry, measure, slotIndex },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      }
    );
    return response.data;
  } catch (Servererror: any) {
    console.error('POST error:', Servererror.toJSON?.() || Servererror);
    throw new Error('Error saving settings');
  }
};

export const loadSettings = async (payload: { name: string; index: number }): Promise<any> => {
  try {
    const response = await axios.post(POST_URL_Load, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });
    return response.data;
  } catch (Servererror: any) {
    console.error('POST error:', Servererror.toJSON?.() || Servererror);
    throw new Error('Error loading settings');
  }
};

export const postDeviceState = async (data: Record<string, any>): Promise<void> => {
  try {
    const response = await axios.post(POST_URL, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rawText = response.data;
    // console.log('Raw response:', rawText);
  } catch (Servererror :any) {
    //console.error('POST error:', error);
    console.error('POST error:', Servererror.toJSON?.() || Servererror);
    throw new Error('Error posting device state');
  }
};
export const pairNewDevice = async (ssid: string, password: string): Promise<any> => 
  { 
    try { const response = await axios.post( POST_URL_Pair, 
      { ssid, password }, 
      { headers: { 'Content-Type': 'application/json' }, 
      timeout: 20000, } ); 
      return response.data; 
    } 
    catch (error: any) 
    { console.error('Pairing error:', error.toJSON?.() || error); 
      throw new Error('Error pairing device'); } };