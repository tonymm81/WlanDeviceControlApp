export type RawDeviceMap = Record<string, any[]>;// orginal get request object

export interface Device {
  id: number;
  name: string;
  ip: string;
  devType: number;
  type: 'lamp' | 'socket' | 'desk' | 'unknown';
  red?: number;
  green?: number;
  bulb_colormode?: number;
  colortemp?:number;
  brightness?: number;
  isOn?: boolean;
  height?: number;
  raw: any[];
}