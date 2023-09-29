import React from 'react';
import {Text, TextInput, View} from 'react-native';

type GoodInputProps = {
  label?: string;
} & React.ComponentProps<typeof TextInput>;

export default function GoodInput({label, ...props}: GoodInputProps) {
  return (
    <View className="m-3 w-full">
      <Text className="text-sm my-2 font-bold text-zinc-800">{label}</Text>
      <TextInput
        {...props}
        className="w-full bg-yellow-100 p-3 text-2xl rounded-lg text-center"
      />
    </View>
  );
}
