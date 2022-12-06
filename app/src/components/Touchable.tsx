import React, {ReactElement} from 'react';
import {TouchableHighlightProps, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const Touchable = ({
  children,
  padding,
  ...props
}: {children?: ReactElement; padding?: boolean} & TouchableHighlightProps) => {
  const taliwind = useTailwind();

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.6}
      style={[taliwind('rounded-full'), padding && taliwind('p-4 -m-4 items-center justify-center'), props.style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
