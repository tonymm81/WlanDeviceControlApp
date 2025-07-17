export interface Device {// devices json object
  id: number;
  name: string;
  type: 'lamp' | 'socket' | 'desk' | 'unknown';
  ip: string;
  port: number;
  red?: number;
  green?: number;
  blue?: number;
  brightness?: number;
  isOn?: boolean;
  height?: number;
  raw?: any[];
}