import axios from 'axios';
import { Device } from '../types';
import { parseDevices } from '../utils/parseDevices';

const API_URL = 'http://192.168.68.201:5000/data';
const POST_URL = 'http://192.168.68.201:5000/receive';

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

export const postDeviceState = async (data: Record<string, any>): Promise<void> => {
  try {
    const response = await axios.post(POST_URL, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });
    const rawText = response.data;
    // console.log('Raw response:', rawText);
  } catch (Servererror :any) {
    //console.error('POST error:', error);
    console.error('POST error:', Servererror.toJSON?.() || Servererror);
    throw new Error('Error posting device state');
  }
};
