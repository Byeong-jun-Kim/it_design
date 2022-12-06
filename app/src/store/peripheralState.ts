import create from 'zustand';
import {IPeripheral} from '../types/interfaces';

export interface IPeripheralState {
  all: IPeripheral[];
  connected: IPeripheral | null;
  isConnected: boolean;
  setList: (peripherals: IPeripheral[]) => void;
  connect: (peripheral: IPeripheral) => void;
  disconnect: () => void;
}

const usePeripheralState = create<IPeripheralState>()(set => ({
  all: [],
  connected: null,
  isConnected: false,
  setList: (peripherals: IPeripheral[]) => set({all: peripherals}),
  connect: (peripheral: IPeripheral) => set({connected: peripheral, isConnected: true}),
  disconnect: () => set({connected: null, isConnected: false}),
}));

export default usePeripheralState;
