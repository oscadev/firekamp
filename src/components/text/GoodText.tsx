import React from 'react';
import {Text} from 'react-native';

type GoodTextProps = {
  variant?:
    | 'title'
    | 'body'
    | 'subtitle'
    | 'alternate'
    | 'description'
    | 'stat-title';
  children: React.ReactNode;
};

export default function GoodText({variant, children}: GoodTextProps) {
  let cName;

  switch (variant) {
    case 'title':
      cName = 'text-7xl text-zinc-800 font-light text-center';
      break;
    case 'subtitle':
      cName = 'text-4xl text-emerald-600 font-bold';
      break;
    case 'alternate':
      cName = 'text-2xl text-black font-light';
      break;
    case 'body':
      cName = 'text-2xl text-emerald-400 font-light';
      break;
    case 'description':
      cName = 'text-sm text-zinc-200 font-bold mt-2';
      break;
    case 'stat-title':
      cName = 'text-2xl text-white font-bold';
      break;
    default:
      cName = 'text-sm text-cyan-400 font-semibold my-2';
      break;
  }
  return <Text className={cName}>{children}</Text>;
}
