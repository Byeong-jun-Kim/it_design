import {Platform, PermissionsAndroid} from 'react-native';

export function permission() {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN).then(result => {
      if (result) {
        console.log('Permission is OK');
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN).then(result2 => {
          if (result2) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE).then(result => {
      if (result) {
        console.log('Permission is OK');
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE).then(result2 => {
          if (result2) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT).then(result => {
      if (result) {
        console.log('Permission is OK');
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT).then(result2 => {
          if (result2) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(result => {
      if (result) {
        console.log('Permission is OK');
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(result2 => {
          if (result2) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
  }
}
