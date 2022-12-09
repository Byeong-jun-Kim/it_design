import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BleManager from 'react-native-ble-manager';
import {Button} from '../components/Button';
import {styles} from '../utils/styles';
import Input from '../components/Input';
import useSettingState from '../store/settingState';
import usePeripheralState from '../store/peripheralState';
import {SERVICE_UUID, TX_UUID} from '../utils/constants';

const Row = ({
  label,
  isInt,
  value,
  setValue,
}: {
  label: string;
  isInt: boolean;
  value: number;
  setValue: (n: number) => void;
}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-row')}>
      <Text style={tailwind('text-black text-b2 m-7')}>{label}:</Text>
      <Input
        className={'w-52'}
        textClassName={'mx-3'}
        onChangeText={(text: string) => setValue((isInt ? parseInt(text, 10) : parseFloat(text)) || 0)}
        text={value.toString()}
      />
    </View>
  );
};

const Setting = ({goBack}: {goBack: () => void}) => {
  const tailwind = useTailwind();
  const state = useSettingState();
  const peripheral = usePeripheralState(_state => _state.connected);

  const [data, setData] = useState<number>(0);

  const handleSendData = async () => {
    if (peripheral) {
      await BleManager.write(peripheral.id, SERVICE_UUID, TX_UUID, [data]);
    }
  };

  return (
    <SafeAreaView style={[tailwind('flex items-start w-full flex-1 bg-white p-20'), styles.container]}>
      <View>
        <View style={tailwind('items-start mx-10')}>
          <Button onPress={goBack}>{'< Back'}</Button>
        </View>
        <View style={tailwind('m-20')}>
          <Row label="Sampling Rate" isInt={true} value={state.samplingRate} setValue={state.setSamplingRate} />
          <Row label="Sampling Time(sec)" isInt={true} value={state.samplingTime} setValue={state.setSamplingTime} />
          <Row label="BLE Data Count" isInt={true} value={state.dataCount} setValue={state.setDataCount} />
          <Row
            label="Feedback Threeshold"
            isInt={true}
            value={state.feedbackThreshold}
            setValue={state.setFeedbackThreshold}
          />
          <Row
            label="Feedback Duration(sec)"
            isInt={true}
            value={state.feedbackDuration}
            setValue={state.setFeedbackDuration}
          />
          <Row label="PTT 0(sec)" isInt={false} value={state.ptt0} setValue={state.setPtt0} />
          <Row label="SBP 0" isInt={true} value={state.sbp0} setValue={state.setSbp0} />
          <Row label="DBP 0" isInt={true} value={state.dbp0} setValue={state.setDbp0} />
          <Row
            label="Chart Update Interval(sec)"
            isInt={false}
            value={state.updateChartInterval}
            setValue={state.setUpdateChartInterval}
          />
          <Row label="Chart Interval(sec)" isInt={true} value={state.chartInterval} setValue={state.setChartInterval} />
          <Row label="Countdown(sec)" isInt={true} value={state.countdown} setValue={state.setCountDown} />
          <View style={tailwind('flex-row')}>
            <Text style={tailwind('text-black text-b2 m-7')}>{'Send Data'}</Text>
            <Input
              className={'w-52'}
              textClassName={'mx-3'}
              onChangeText={(text: string) => setData(parseInt(text, 10) || 0)}
              text={data.toString()}
            />
            <Button onPress={handleSendData}>{'Send'}</Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
