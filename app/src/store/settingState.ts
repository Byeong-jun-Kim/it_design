import create from 'zustand';

export interface ISettingState {
  samplingRate: number;
  samplingTime: number;
  dataCount: number;
  feedbackThreshold: number;
  feedbackDuration: number;
  ptt0: number;
  sbp0: number;
  dbp0: number;
  updateChartInterval: number;
  chartInterval: number;
  countdown: number;
  setSamplingRate: (samplingRate: number) => void;
  setSamplingTime: (samplingTime: number) => void;
  setDataCount: (bytes: number) => void;
  setFeedbackThreshold: (threshold: number) => void;
  setFeedbackDuration: (feedbackDuration: number) => void;
  setPtt0: (ptt0: number) => void;
  setSbp0: (sbp0: number) => void;
  setDbp0: (dbp0: number) => void;
  setUpdateChartInterval: (updateChartInterval: number) => void;
  setChartInterval: (chartInterval: number) => void;
  setCountDown: (countdown: number) => void;
}

const useSettingState = create<ISettingState>()(set => ({
  samplingRate: 40,
  samplingTime: 20,
  dataCount: 5,
  updateChartInterval: 0.5,
  ptt0: 0.12903225806451613,
  sbp0: 112,
  dbp0: 88,
  feedbackThreshold: 100,
  feedbackDuration: 30,
  countdown: 5,
  chartInterval: 2,
  setSamplingRate: (samplingRate: number) => set({samplingRate}),
  setDataCount: (dataCount: number) => set({dataCount}),
  setUpdateChartInterval: (updateChartInterval: number) => set({updateChartInterval}),
  setSamplingTime: (samplingTime: number) => set({samplingTime}),
  setPtt0: (ptt0: number) => set({ptt0}),
  setSbp0: (sbp0: number) => set({sbp0}),
  setDbp0: (dbp0: number) => set({dbp0}),
  setFeedbackThreshold: (feedbackThreshold: number) => set({feedbackThreshold}),
  setFeedbackDuration: (feedbackDuration: number) => set({feedbackDuration}),
  setCountDown: (countdown: number) => set({countdown}),
  setChartInterval: (chartInterval: number) => set({chartInterval}),
}));

export default useSettingState;
