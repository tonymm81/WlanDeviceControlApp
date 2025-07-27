import { Device } from '../types';

export const serializeDevices = (
  devices: Record<string, Device>
): Record<string, any[]> => {
  const out: Record<string, any[]> = {};

  for (const key in devices) {
    const dev = devices[key];

    if (Array.isArray(dev.raw)) {
      const arr = [...dev.raw];
      // jos arr[1] on objekti, klonataan se ja päivitetään kentät
      if (typeof arr[1] === 'object' && arr[1] !== null) {
        const cfg = { ...arr[1] as Record<string, any> };
        cfg.pwr = dev.isOn ? 1 : 0;

        // vain jos propsit ovat olemassa
        if (dev.brightness !== undefined) {
          cfg.brightness = dev.brightness;
        }
        if (dev.bulb_colormode !== undefined) {
          cfg.bulb_colormode = dev.bulb_colormode;
        }

        arr[1] = cfg;
      } else {
        // legacy‐array, pelkkä on/off
        arr[1] = dev.isOn;
      }

      out[key] = arr;
    } else {
      // fallback jos raw ei ole array
      out[key] = [dev.ip, dev.isOn, dev.devType];
    }
  }

  return out;
};