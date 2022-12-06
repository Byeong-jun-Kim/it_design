import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import BleManager from 'react-native-ble-manager';
import usePeripheralState from '../../store/peripheralState';
import {useTailwind} from 'tailwind-rn';
import callApi from '../../utils/callApi';
import {toInt} from '../../utils/common';
import useSettingState from '../../store/settingState';
import {SERVICE_UUID, TX_UUID} from '../../utils/constants';

const Result = ({ppgData, ecgData}: {ppgData: number[]; ecgData: number[]}) => {
  const tailwind = useTailwind();
  const [samplingRate, ptt0, sbp0, dbp0, feedbackThreshold] = useSettingState(state => [
    state.samplingRate,
    state.ptt0,
    state.sbp0,
    state.dbp0,
    state.feedbackThreshold,
  ]);
  const peripheral = usePeripheralState(state => state.connected);

  const [heartRate, setHeartRate] = useState<number>(0);
  const [bloodPressure, setBloodPressure] = useState<number>(0);
  const [ptt, setPtt] = useState<number>(0);

  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    callApi<
      {ecg_data: number[]; ppg_data: number[]; sampling_rate: number; ptt_0: number; sbp_0: number; dbp_0: number},
      {blood_pressure: number; heart_rate: number; ptt: number}
    >('/estimate', {
      ecg_data: ecgData,
      ppg_data: ppgData,
      sampling_rate: samplingRate,
      ptt_0: ptt0,
      sbp_0: sbp0,
      dbp_0: dbp0,
    }).then(res => {
      setHeartRate(res.heart_rate);
      setBloodPressure(res.blood_pressure);
      setPtt(res.ptt);
    });
  }, [ecgData, ppgData, samplingRate, ptt0, sbp0, dbp0]);

  const handleFeedback = useCallback(async () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (peripheral && bloodPressure >= feedbackThreshold) {
      await BleManager.write(peripheral.id, SERVICE_UUID, TX_UUID, [1]);
      const id = setTimeout(() => BleManager.write(peripheral.id, SERVICE_UUID, TX_UUID, [0]), 30 * 1000);
      setTimeoutId(id);
    } else if (peripheral) {
      await BleManager.write(peripheral.id, SERVICE_UUID, TX_UUID, [0]);
    }
  }, [bloodPressure, feedbackThreshold, peripheral, timeoutId]);

  useEffect(() => {
    handleFeedback();
  }, [handleFeedback, bloodPressure]);

  return (
    <View>
      <Text style={tailwind('mt-10 text-center text-b1 text-black')}>HR: {toInt(heartRate) || '???'}</Text>
      <Text style={tailwind('mt-10 text-center text-c1 text-black')}>PTT: {ptt.toFixed(7) || '???'}</Text>
      <Text style={tailwind('mt-10 text-center text-h1 text-black')}>BP: {toInt(bloodPressure) || '???'}</Text>
    </View>
  );
};

export default Result;
