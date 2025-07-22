import { Device } from '../types';

export const serializeDevices = (
  devices: Record<string, Device>
): Record<string, any[]> => {
  const out: Record<string, any[]> = {};
  for (const key in devices) {
    const dev = devices[key];
    if (Array.isArray(dev.raw)) {
      const arr = [...dev.raw];
      if (arr.length > 1) {
        if (typeof arr[1] === 'object') {
          (arr[1] as any).pwr = dev.isOn ? 1 : 0;
        } else {
          arr[1] = dev.isOn;
        }
      }
      out[key] = arr;
    } else {
      out[key] = [dev.ip, dev.isOn, dev.devType];
    }
  }
  return out;
};