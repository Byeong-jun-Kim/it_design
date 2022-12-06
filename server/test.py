import neurokit2 as nk
import pandas as pd
import matplotlib.pyplot as plt

# Generate 15 seconds of PPG signal (recorded at 250 samples / second)
# ppg = nk.ppg_simulate(duration=15, sampling_rate=250, heart_rate=70)

# data_path = 'ppgdata.xlsx'
# ppg = pd.read_excel(data_path, usecols = [1]).values
# ppg = ppg - 720
ppg = [145,144,143,143,143,144,147,148,149,150,150,142,139,139,139,141,143,144,143,143,142,142,144,146,146,148,150,149,141,138,138,139,141,144,143,142,143,142,142,144,146,146,148,150,149,142,139,138,139,141,143,143,143,142,141,142,143,144,145,147,148,147,141,138,137,138,140,142,142,142,141,140,141,143,144,145,147,148,145,140,137,136,138,140,140,141,141,140,139,141,142,143,144,146,146,146,140,137,136,139,140,141,142,142,140,140,142,143,144,146,148,147,149,144,138,136,138,140,140,142,143,141,141,142,143,144,146,148,148,149,148,140,137,139,140,140,143,143,142,142,143,142,144,146,147,147,150,150,142,138,138,139,140,143,144,142,142,142,142,143,146,147,148,150,150,146,139,138,138,140,142,143,144,144,142,142,145,146,147,148,151,151,148,141,139,138,140,143,144,145,145,143,143,145,146,147,150,152,152,152,145,139,138,141,143,143,145,146,144,144,145,147,148,151,151,152,153,149,140,139,141,142,144,147,148,145,146,146,146,148,151,152,152,154,149,140,140,141,142,144,147,147,145,145,146,146,148,151,152,152,153,144,139,140,142,143,146,147,146,144,145,146,147,150,151,152,153,151,141,139,141,142,144,146,147,145,144,145,145,147,150,151,151,152,149,140,139,140,142,143,146,146,144,144,145,146,147,149,150,151,153,148,140,139,141,141,144,146,145,144,144,145,144,147,149,150,151,152,148,140,139,140,141,144,147,145,144,144,144,145,147,149,149,151,152,146,140,140,140,141,144,146,144,145,144,144,146,148,149,150,152,152,145,140,139,140,142,145,145,144,145,145,144,146,148,149,150,152,152,148,141,139,139,141,143,144,144,144,143,142,145,146,147,149,150,149,148,141,138,138,140,141,142,144,143,142,142,143,144,145,148,148,148,150,145,138,137,139,141,141,143,143,141,142,143,143,145,148,148,149,150,147,139,138,139,139,141,143,143,142,142,142,142,144,146,147,148,149,143,137,137,139,139,141,143,142,141,142,142,143,145,148,148,149,147,138,136,138,140,140,142,143,141,141,142,143,144,146,148,148,148,142,137,137,139,140,140,142,141,140,140,141,142,143,145,146,145,143,138,136,137,138,139,140,141,140,139,140,141,142,144,145,145,145,141,136,136,137,139,139,140,141,139,138,140,140,141,143,144,144,144,140,136,135,137,137,138,140,140,138,139,140,140,141,143,144,144,145,139,135,135,137,137,138,140,140,138,139,140,140,142,144,144,144,145,138,135,135,137,137,139,140,139,138,139,140,140,142,144,144,145,145,138,135,136,136,137,139,140,140,139,140,140,140,143,144,145,146,147,143,136,136,136,137,140,141,141,141,141,140,141,143,144,144,147,148,147,141,137,136,137,139,141,142,142,141,140,141,143,144,145,148,149,148,146,139,136,138,140,141,143,145,143,142,143,144,145,147,149,149,150,146,138,137,138,141,142,144,145,143,141,142,144,144,147,149,149,150,145,137,136,139,141,141,143,144,142,141,143,143,145,147,148,148,150,144,137,137,139,140,141,144,143,141,141,142,143,144,147,148,147,147,140,136,136,138,139,141,142,140,139,141,141,141,143,144,145,145,145,138,135,136,138,138,140,141,139,139,140,140,141,143,144,144,145,141,136,135,136,137,139,140,140,138,139,140,140,141,143,144,144,143,137,134,135,136,137,138,139,138,137,138,139,139,141,143,143,143,142,136,134,135,136,136,138,139,137,137,138,138,139,141,142,142,143,142,136,134,134,136,136,138,139,137,137,138,139,139,142,143,143,145,145,139,135,135,135,136,139,139,138,138,138,137,139,141,142,143,144,144,141,136,134,134,136,138,138,139,139,137,137,139,141,141,143,145,144,141,136,135,135,137,139,140,140,140,139,140,141,142,143,145,146,146,142,137,135,136,138,140,141,142,141,139,141,143,143,145,147,147,148,147,139,136,136,139,140,142,143,142,141,142,143,144,146,148,148,149,149,140,137,137,139,141,143,144,142,142,143,143,144,147,148,148,150,147,139,137,138,139,141,143,143,142,142,142,142,144,146,147,148,150,143,137,138,139,140,142,144,143,142,142,143,143,145,147,148,149,147,139,137,138,139,140,143,143,142,141,142,142,144,146,147,148,149,145,137,136,139,139,141,144,143,142,142,143,143,145,147,148,148,150,145,138,137,138,139,142,144,142,141,142,142,142,145,147,147,148,149,144,137,138,138,139,142,144,143,141,141,141,142,144,146,146,148,148,140,137,138,138,140,142,143,141,142,142,141,143,146,146,147,149,143,137,137,138,138,141,143,142,141,141,142,142,145,146,146,148,147,139,136,137,138,139,141,142,140,140,141,141,142,145,146,146,148,147,139,137,138,138,140,142,143,141,140,142,142,143,146,146,147,149,148,140,137,138,139,141,144,144,142,142,143,143,145,148,148,149,151,149,141,138,139,139,142,145,144,143,143,143,143,146,147,148,150,152,147,140,138,139,140,143,145,144,144,144,143,144,147,147,149]
ppg = list(map(lambda d: d - 140, ppg))
print(ppg)
# Process it
signals, info = nk.ppg_process(ppg, sampling_rate=31.25)
print(info)
# print(signals["PPG_Clean"])
# print(signals["PPG_Peaks"])
for idx, is_peak in enumerate(signals["PPG_Peaks"]):
  if is_peak == 1:
    print(idx)

print(signals["PPG_Rate"].mean())
# Visualize the processing
# nk.ppg_plot(signals, sampling_rate=31.25)
nk.events_plot(info["PPG_Peaks"], ppg)

plt.show()
# plt.figure(figsize=(12,4))
# plt.plot(signals)
# plt.show()
