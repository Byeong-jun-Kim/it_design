import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View} from 'react-native';
import BleManager from 'react-native-ble-manager';
import usePeripheralState from '../store/peripheralState';
import {bleManagerEmitter} from '../store/bleManager';
import {useTailwind} from 'tailwind-rn';
import {Button} from '../components/Button';
import {styles} from '../utils/styles';
import useSettingState from '../store/settingState';
import {CHARACTERISTIC_UUID, SERVICE_UUID} from '../utils/constants';
import Result from '../components/show/Result';
import ShowCharts from '../components/show/Chart';
import Setting from './Setting';
import CountDown from './Countdown';
import {toInt} from '../utils/common';

const STATE = {INIT: 0, COUNTDOWN: 1, START: 2, RESULT: 3} as const;

const Show = () => {
  const tailwind = useTailwind();
  const [dataCount, samplingTime] = useSettingState(state => [state.dataCount, state.samplingTime]);

  const [peripheral, disconnect] = usePeripheralState(state => [state.connected, state.disconnect]);
  const [ppgData, setPpgData] = useState<number[]>([]);
  const [ecgData, setEcgData] = useState<number[]>([]);

  const [state, setState] = useState<number>(STATE.INIT);
  const [showSetting, setShowSetting] = useState<boolean>(false);

  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const [update, setUpdate] = useState<boolean>(false);

  const updatePpgData = useCallback((newData: number[]) => setPpgData([...ppgData, ...newData]), [ppgData]);
  const updateEcgData = useCallback((newData: number[]) => setEcgData([...ecgData, ...newData]), [ecgData]);

  const getValueFromBytes = (data: number[]) => {
    return Array(toInt(data.length / 2))
      .fill(null)
      .map((_v, i) => 256 * data[2 * i] + data[2 * i + 1]);
  };

  const handleUpdateValueForCharacteristic = useCallback(
    (_data: {peripheral: string; characteristic: string; value: number[]}) => {
      switch (_data.characteristic.toLowerCase()) {
        case CHARACTERISTIC_UUID.toLowerCase():
          updatePpgData(getValueFromBytes(_data.value.slice(0, 2 * dataCount)));
          updateEcgData(getValueFromBytes(_data.value.slice(2 * dataCount, 4 * dataCount)));
          break;
        default:
          break;
      }
    },
    [dataCount, updateEcgData, updatePpgData],
  );

  const handleGoBack = useCallback(async () => {
    try {
      if (peripheral) {
        bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
        await BleManager.stopNotification(peripheral.id, SERVICE_UUID, CHARACTERISTIC_UUID);
        await BleManager.disconnect(peripheral.id);
      }
    } catch (e) {
      console.log(e);
    }
    disconnect();
  }, [disconnect, peripheral]);

  const handleStop = () => {
    setState(STATE.INIT);
    if (peripheral?.id) {
      BleManager.stopNotification(peripheral.id, SERVICE_UUID, CHARACTERISTIC_UUID);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleStart = () => {
    setState(STATE.COUNTDOWN);
    setPpgData([]);
    setEcgData([]);
  };

  const handleShowSetting = () => {
    setShowSetting(true);
    setUpdate(false);
  };

  const handleFinishedCountdown = () => {
    setState(STATE.START);
    if (peripheral?.id) {
      BleManager.startNotification(peripheral.id, SERVICE_UUID, CHARACTERISTIC_UUID);
      const id = setTimeout(() => {
        setState(STATE.RESULT);
        setUpdate(true);
        BleManager.stopNotification(peripheral.id, SERVICE_UUID, CHARACTERISTIC_UUID);
      }, samplingTime * 1000);
      setTimeoutId(id);
    }
  };

  useEffect(() => {
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    };
  }, [handleUpdateValueForCharacteristic]);

  if (peripheral === null) {
    return <></>;
  }
  if (state === STATE.COUNTDOWN) {
    return <CountDown finished={handleFinishedCountdown} />;
  }
  if (showSetting) {
    return <Setting goBack={() => setShowSetting(false)} />;
  }
  return (
    <SafeAreaView style={[tailwind('flex items-center w-full flex-1 bg-white p-20'), styles.container]}>
      <View>
        <View style={tailwind('flex-row w-full m-10')}>
          <View style={tailwind('flex-1 items-start mx-10')}>
            <Button onPress={handleGoBack}>{'< Back'}</Button>
          </View>
          <View style={tailwind('flex-1 items-center mx-10')}>
            {state === STATE.START ? (
              <Button onPress={handleStop}>{'Stop'}</Button>
            ) : (
              <Button onPress={handleStart}>{'Start'}</Button>
            )}
          </View>
          <View style={tailwind('flex-1 items-end mx-10')}>
            <Button onPress={handleShowSetting}>{'Setting'}</Button>
          </View>
        </View>
        <ShowCharts ecgData={ecgData} ppgData={ppgData} finished={state !== STATE.START} />
        {state === STATE.RESULT && <Result ppgData={ppgData} ecgData={ecgData} update={update} />}
      </View>
    </SafeAreaView>
  );
};

export default Show;
