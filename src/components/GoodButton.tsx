import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

type GoodButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

export default function GoodButton({children, ...props}: GoodButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className="items-center px-6 py-4 bg-stone-800 rounded-full my-2 w-full">
      <Text className="font-bold text-white">{children}</Text>
    </TouchableOpacity>
  );
}
