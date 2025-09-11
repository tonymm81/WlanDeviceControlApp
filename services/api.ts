import axios from 'axios';
import { Device } from '../types';
import { parseDevices } from '../utils/parseDevices';
import { SavedSettings } from '../types';

const API_URL = 'http://192.168.68.201:5000/data';
const API_URL_setting = 'http://192.168.68.201:5000/SavedSettings';
const POST_URL = 'http://192.168.68.201:5000/receive';
const POST_URL_Load = 'http://192.168.68.201:5000/LoadSettingsFromPhone';
const POST_URL_Save = 'http://192.168.68.201:5000/SaveSettingsFromPhone';
const API_URL_ShutDown =  'http://192.168.68.201:5000/ShutDownPythonServer';
const API_URL_UpdateDevices =  'http://192.168.68.201:5000/UpdateTheDevicesJson';

export const fetchDevices = async (): Promise<Record<string, Device>> => {
  try {
    const response = await axios.get(API_URL, { timeout: 15000 });
    return parseDevices(response.data);
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
      
  }catch (error : any){
    throw new Error('Error shutting down');
  }
}

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
