from typing import List
import neurokit2 as nk
import numpy as np
import math

GAMMA=0.031

def process_ppg(ppg_data: List[int], sampling_rate: int):
  signals, info = nk.ppg_process(ppg_data, sampling_rate=sampling_rate)
  return info["PPG_Peaks"], signals["PPG_Rate"].mean()

def process_ecg(ecg_data: List[int], sampling_rate: int):
  _, info = nk.ecg_peaks(ecg_data, sampling_rate=sampling_rate, method="nabian2018")
  return info["ECG_R_Peaks"]

def get_ptt(ecg_peaks: List[int], ppg_peaks: List[int], sampling_rate: int):
  e_i = 0
  ptts = []
  for p_i in range(len(ppg_peaks)-1):
    while e_i < len(ecg_peaks) and ppg_peaks[p_i+1] > ecg_peaks[e_i]:
      e_i = e_i+1
    if e_i-1 < 0:
      continue
    if ecg_peaks[e_i-1] < ppg_peaks[p_i]:
      e_i = e_i-1
      continue
    ptts.append((ppg_peaks[p_i+1] - ecg_peaks[e_i-1]) / sampling_rate)

  print(ptts)
  if len(ptts) <= 0:
    return 0
  # return sum(ptts) / len(ptts)
  return np.median(ptts)

def calculate_bp(ptt: float, ptt_0: float, sbp_0: int, dbp_0: int):
  if ptt == 0:
    return 0
  return (sbp_0 + 2*dbp_0)/3 + ((2/GAMMA)*math.log(ptt_0/ptt)) - ((sbp_0-dbp_0)/3) * ((ptt_0/ptt)**2)

def process(ppg_data: List[int], ecg_data: List[int], sampling_rate: int, ptt_0: float, sbp_0: int, dbp_0: int):
  try:
    ppg_peaks, heart_rate = process_ppg(ppg_data, sampling_rate)
  except:
    print('ppg process exception')
    ppg_peaks, heart_rate = [], 0.0
  if np.isnan(heart_rate):
    heart_rate = 0.0

  try:
    ecg_peaks = process_ecg(ecg_data, sampling_rate)
  except:
    print('ecg process exception')
    ecg_peaks = []

  ptt = get_ptt(ecg_peaks, ppg_peaks, sampling_rate)
  blood_pressure = calculate_bp(ptt, ptt_0, sbp_0, dbp_0)
  return heart_rate, blood_pressure, ptt
