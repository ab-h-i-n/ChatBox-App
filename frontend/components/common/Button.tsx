import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type ButtonProps = {
  children: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  containerClass?: string;
  disabled?: boolean
};

const Button = ({ children, className, containerClass, onClick, disabled }: ButtonProps) => {
  return (
    <View className={containerClass}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onClick}
        activeOpacity={0.8}
        className={`bg-secondary py-3 px-10 min-w-[80%] rounded-md ${className}`}
      >
        <Text className="text-white font-semibold text-xl text-center">
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
