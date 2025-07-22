import { Device } from '../types';
import { parseDevices } from '../utils/parseDevices';

const API_URL = 'http://192.168.68.201:5000/data';
const POST_URL = 'http://192.168.68.201:5000/receive';

export const fetchDevices = async (): Promise<Record<string, Device>> => {// makes a get request to rasbperry pi
  const response = await fetch(API_URL);
  const jsonData = await response.json();
   console.log('[fetchDevices] got json:', jsonData);
  return parseDevices(jsonData);
};

export const postDeviceState = async (data: Record<string, any>): Promise<void> => {
  
  try {
    await fetch(POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('POST error:', error);
    throw new Error('Error posting device state');
  }
};