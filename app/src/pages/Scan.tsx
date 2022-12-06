import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, Text, FlatList, TouchableHighlight} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {useTailwind} from 'tailwind-rn';
import colors from '../../colors';
import {Button} from '../components/Button';
import {bleManagerEmitter} from '../store/bleManager';
import usePeripheralState from '../store/peripheralState';
import {IPeripheral} from '../types/interfaces';
import {styles} from '../utils/styles';

const Scan = () => {
  const tailwind = useTailwind();
  const connect = usePeripheralState(state => state.connect);
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState<Map<string, IPeripheral>>(new Map());
  const [list, setList] = useState<IPeripheral[]>([]);

  const startScan = () => {
    if (!isScanning) {
      setPeripherals(new Map());
      BleManager.scan([], 30, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleStopScan = useCallback(() => {
    console.log('Scan is stopped');
    setIsScanning(false);
    setList(Array.from(peripherals.values()));
  }, [peripherals]);

  const handleDiscoverPeripheral = useCallback(
    (peripheral: IPeripheral) => {
      if (!peripheral.name) {
        return;
      }
      setPeripherals(peripherals.set(peripheral.id, peripheral));
      setList(Array.from(peripherals.values()));
    },
    [peripherals],
  );

  useEffect(() => {
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  }, [handleDiscoverPeripheral, handleStopScan]);

  const testPeripheral = async (peripheral: IPeripheral) => {
    await BleManager.connect(peripheral.id);
    console.log('Connected to ' + peripheral.id);

    const peripheralData = await BleManager.retrieveServices(peripheral.id);
    console.log('Retrieved peripheral services', peripheralData);

    const rssi = await BleManager.readRSSI(peripheral.id);
    console.log('Retrieved actual RSSI value', rssi);
    connect(peripheral);
  };

  const renderItem = (item: IPeripheral) => {
    return (
      <TouchableHighlight
        onPress={() => testPeripheral(item)}
        style={tailwind('flex justify-center pb-8')}
        underlayColor={colors.gray[400]}>
        <View>
          <Text style={tailwind('text-b1 flex items-center justify-center text-black')}>
            {item.advertising.localName || item.name}
          </Text>
          <Text style={tailwind('text-c2 text-black')}>RSSI: {item.rssi}</Text>
          <Text style={tailwind('text-c2 text-black')}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={[tailwind('items-center justify-center w-full flex-1 bg-white p-20'), styles.container]}>
      <View>
        <View style={tailwind('mb-10')}>
          <Button disabled={isScanning} onPress={() => startScan()}>
            {'Scan Bluetooth'}
          </Button>
        </View>
        {list.length === 0 && (
          <View style={tailwind('items-center')}>
            <Text style={tailwind('text-black')}>No peripherals</Text>
          </View>
        )}
      </View>
      <FlatList
        style={tailwind('flex-1 w-full px-20')}
        data={list}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Scan;
