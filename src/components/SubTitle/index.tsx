import React from 'react';
import { useTheme } from '@/hooks';
import { Text } from 'react-native';

interface IProps {
  text: string;
}

const SubTitle = ({ text }: IProps) => {
  const { Fonts } = useTheme();

  return <Text style={[Fonts.textMedium]}>{text}</Text>;
};

export default SubTitle;
