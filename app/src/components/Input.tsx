import React, {useRef} from 'react';
import {TextInput, Text, View, TextInputProps, Platform} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import Touchable from './Touchable';

const Input = ({
  className = '',
  textClassName = '',
  text,
  onChangeText,
  disabled,
  ...props
}: {
  className?: string;
  textClassName?: string;
  text: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
} & TextInputProps) => {
  const tailwind = useTailwind();

  const ref = useRef<TextInput>(null);

  if (disabled) {
    return (
      <View
        style={[
          tailwind(Platform.OS === 'android' ? 'h-36' : 'h-28'),
          tailwind('h-28 w-full bg-gray-50 border-b border-gray-300 justify-center px-3'),
          tailwind(className),
        ]}>
        <Text style={tailwind('text-b1 text-gray-600')}>{text}</Text>
      </View>
    );
  }

  return (
    <Touchable
      style={[tailwind('h-36 border-b border-gray-300 rounded-0 relative w-full'), tailwind(className)]}
      activeOpacity={1}>
      <>
        <Touchable
          onPress={() => {
            ref?.current?.focus();
          }}
          style={tailwind('absolute top-0 left-0 right-0 bottom-0 -z-10 rounded-0')}
          children={<></>}
        />
        <TextInput
          ref={ref}
          value={text}
          onChangeText={onChangeText}
          style={[tailwind('text-b1 text-black w-full pb-5'), tailwind(textClassName)]}
          {...props}
        />
      </>
    </Touchable>
  );
};

export default Input;
