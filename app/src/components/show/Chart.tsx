import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {LineChart} from 'react-native-chart-kit';
import useSettingState from '../../store/settingState';

const Chart = ({data}: {data: number[]}) => {
  const [chartInterval, samplingRate] = useSettingState(state => [state.chartInterval, state.samplingRate]);
  if (data.length === 0) {
    return <></>;
  }
  const chartData = {
    datasets: [{data: data.slice(-chartInterval * samplingRate)}],
    labels: [],
  };
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 256, ${opacity})`,
  };
  return (
    <LineChart
      width={Dimensions.get('window').width - 40}
      height={220}
      data={chartData}
      chartConfig={chartConfig}
      withDots={false}
      withShadow={false}
      withInnerLines={false}
      withOuterLines={false}
      bezier={true}
    />
  );
};

const ShowCharts = ({ecgData, ppgData, finished}: {ecgData: number[]; ppgData: number[]; finished: boolean}) => {
  const tailwind = useTailwind();
  const updateChartInterval = useSettingState(state => state.updateChartInterval);

  const [updateChart, setUpdateChart] = useState<number>(0);
  const [updatedChart, setUpdatedChart] = useState<number>(0);
  const [ppgChartData, setPpgChartData] = useState<number[]>([]);
  const [ecgChartData, setEcgChartData] = useState<number[]>([]);

  useEffect(() => {
    if (finished) {
      return;
    }
    const id = setTimeout(() => setUpdateChart(updateChart + 1), 1000 * updateChartInterval);
    return () => clearTimeout(id);
  }, [finished, updateChart, updateChartInterval]);

  useEffect(() => {
    if (updateChart !== updatedChart) {
      setPpgChartData(ppgData);
      setEcgChartData(ecgData);
      setUpdatedChart(updateChart);
    }
  }, [ecgData, ppgData, updateChart, updatedChart]);

  return (
    <>
      <View style={tailwind('mx-10 mt-10')}>
        <Text style={tailwind('text-b1 text-center text-black')}>PPG</Text>
        <Chart data={ppgChartData} />
      </View>
      <View style={tailwind('mx-10')}>
        <Text style={tailwind('text-b1 text-center text-black')}>ECG</Text>
        <Chart data={ecgChartData} />
      </View>
    </>
  );
};

export default ShowCharts;
