import { Device } from '../types';

export const parseDevices = (
  rawData: Record<string, any>
): Record<string, Device> => {
  console.log('[parseDevices] rawData:', rawData);

  const parsed: Record<string, Device> = {};

  // ─── Erikoiskäsittely: sähkökorkeus ───
  const floorArr = rawData['distance_from_floor'];
  if (Array.isArray(floorArr) && floorArr.length > 0) {
    parsed['distance_from_floor'] = {
      id: 0,
      name: 'Sähköpöydän korkeus',
      ip: '',
      port: 0,
      type: 'desk',
      isOn: false,
      height: Number(floorArr[0]),
      raw: floorArr,
    };
  }

  // ─── Loput laitteet ───
  for (const key in rawData) {
    if (key === 'distance_from_floor') continue; 

    const value = rawData[key];
    if (!Array.isArray(value) || value.length < 3) {
      continue;
    }

    const [ip, config, port, ...rest] = value;
    let type: Device['type'] = 'unknown';
    if (typeof config === 'boolean') {
      type = 'socket';
    } else {
      const lower = key.toLowerCase();
      if (lower.includes('val') || lower.includes('led')) type = 'lamp';
      else if (lower.includes('socket') || lower.includes('pistorasia')) type = 'socket';
      else if (lower.includes('desk') || lower.includes('pöytä')) type = 'desk';
    }

    const isOn = typeof config === 'boolean'
      ? config
      : config.pwr === 1;

    parsed[key] = {
      id: port,
      name: key,
      ip,
      port,
      type,
      red: typeof config === 'object' ? config.red : undefined,
      green: typeof config === 'object' ? config.green : undefined,
      blue: typeof config === 'object' ? config.blue : undefined,
      brightness: typeof config === 'object' ? config.brightness : undefined,
      isOn,
      height: typeof config === 'object' ? config.height : undefined,
      raw: value,
    };
  }

  console.log('[parseDevices] parsed:', parsed);
  return parsed;
};