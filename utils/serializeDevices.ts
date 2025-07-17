import { Device } from '../types';

export const serializeDevices = (
  devices: Record<string, Device>
): Record<string, any[]> => {
  const result: Record<string, any[]> = {};

  Object.entries(devices).forEach(([key, dev]) => {
    const raw = dev.raw;
    
    if (Array.isArray(raw)) {
        // convert object back to json before post request
      const rawCopy = [...raw];
      if (rawCopy[1] && typeof rawCopy[1] === 'object') {
        // lets tell typescript that config is Record<string, any>
        const config = rawCopy[1] as Record<string, any>;
        config.pwr = dev.isOn ? 1 : 0;
      } else {
        // jos raw[1] oli vain boolean
        rawCopy[1] = dev.isOn;
      }

      // 2) Lisätään päivitetty taulukko tulokseen
      result[key] = rawCopy;

    } else {
      // Fallback, jos raw puuttuu
      result[key] = [
        dev.ip,
        dev.isOn,
        dev.port
      ];
    }
  });

  return result;
};