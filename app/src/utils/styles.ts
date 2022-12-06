import {StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
});
