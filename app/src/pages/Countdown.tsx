import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import useSettingState from '../store/settingState';
import {styles} from '../utils/styles';

const CountDown = ({finished}: {finished: () => void}) => {
  const tailwind = useTailwind();
  const countdown = useSettingState(state => state.countdown);
  const [second, setSecond] = useState<number>(countdown);
  useEffect(() => {
    if (second <= 0) {
      finished();
    }
    setTimeout(() => setSecond(prev => prev - 1), 1000);
  }, [finished, second]);

  return (
    <SafeAreaView style={[tailwind('items-center justify-center w-full flex-1 bg-white p-20'), styles.container]}>
      <View>
        <View style={tailwind('items-center justify-center w-full flex-1')}>
          <Text style={tailwind('text-h0 flex items-center justify-center text-black')}>{second}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CountDown;
