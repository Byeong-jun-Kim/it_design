import React from 'react';
import {Text, TouchableHighlight, TouchableHighlightProps} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import colors from '../../colors';

export const Button = ({
  onPress,
  children,
  disabled,
  className = '',
  ...props
}: {
  onPress?: () => void;
  children?: string;
  disabled?: boolean;
  className?: string;
} & TouchableHighlightProps) => {
  const tailwind = useTailwind();

  return (
    <TouchableHighlight
      onPress={onPress}
      style={tailwind(
        ['flex flex-row items-center justify-center rounded h-36 px-18 border border-gray-200', className].join(' '),
      )}
      activeOpacity={0.8}
      underlayColor={colors.gray[100]}
      disabled={disabled}
      {...props}>
      <Text style={tailwind(disabled ? 'text-gray-200' : 'text-blue')}>{children}</Text>
    </TouchableHighlight>
  );
};
