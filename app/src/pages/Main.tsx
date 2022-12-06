import React, {useEffect} from 'react';
import BleManager from 'react-native-ble-manager';
import {bleManagerEmitter} from '../store/bleManager';
import usePeripheralState from '../store/peripheralState';
import {permission} from '../utils/permission';
import Scan from './Scan';
import Show from './Show';

const Main = () => {
  const isConnected = usePeripheralState(state => state.isConnected);

  const handleDisconnectedPeripheral = (data: {peripheral: string; status: number; domain: string; code: number}) => {
    console.log(data.status);
    console.log(data.domain);
    console.log(data.code);
    console.log('Disconnected from ' + data.peripheral);
  };

  useEffect(() => {
    BleManager.start({showAlert: false});
    permission();
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);

    return () => {
      console.log('unmount');
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
    };
  }, []);

  if (!isConnected) {
    return <Scan />;
  }

  return <Show />;
};

export default Main;
