import { Device } from '../types';

export const parseDevices = (rawData: Record<string, any>): Record<string, Device> => {
  //console.log('[parseDevices] rawData:', rawData);

  const parsed: Record<string, Device> = {};
  
  // ─── Erikoiskäsittely: sähkökorkeus ───
  const floorArr = rawData['distance_from_floor'];
  if (Array.isArray(floorArr) && floorArr.length > 0) {
    parsed['distance_from_floor'] = {
      id: 0,
      name: 'Sähköpöydän korkeus',
      ip: '',
      devType : 0,
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

      const [ip, config, devType, ...rest] = value;
    //const devType = typeof value[5] === 'number' ? value[5] : undefined;
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
      id: devType,
      name: key,
      ip,
      devType,
      type,
      red: typeof config === 'object' ? config.red : undefined,
      green: typeof config === 'object' ? config.green : undefined,
      bulb_colormode: typeof config === 'object' ? config.bulb_colormode : undefined,
      colortemp : typeof config === 'object' ? config.colortemp : undefined,
      brightness: typeof config === 'object' ? config.brightness : undefined,
      isOn,
      height: typeof config === 'object' ? config.height : undefined,
      raw: value,
    };
  }

  //console.log('[parseDevices] parsed:', parsed);
  return parsed;
};