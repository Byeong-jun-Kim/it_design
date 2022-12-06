export interface IPeripheral {
  id: string;
  advertising: {
    isConnectable?: boolean | number;
    kCBAdvDataRxPrimaryPHY?: number;
    kCBAdvDataRxSecondaryPHY?: number;
    kCBAdvDataTimestamp?: number;
    localName?: string;
    txPowerLevel?: number;
    serviceUUIDs?: string[];
    manufacturerData?: any;
  };

  name?: string;
  rssi: number;

  characteristics?: {
    characteristic: string;
    isNotifying: boolean;
    properties: any[];
    service: string;
  }[];
  // services: string[];
}
