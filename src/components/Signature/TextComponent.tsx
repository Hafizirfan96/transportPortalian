import Input from '../Input/Input';
import { useTheme } from '@/hooks';
import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface IProps {
  totalKollies: string;
  enterName: (text: string) => void;
}

const TextComponent = ({ totalKollies, enterName }: IProps) => {
  const [Kollies, setKollies] = useState<string>();
  const { Gutters, Fonts } = useTheme();
  const { control } = useForm();

  useEffect(() => {
    const kolliess = totalKollies;
    setKollies(kolliess);
  }, [totalKollies]);

  const onChangeName = (text: string) => {
    enterName(text);
  };

  return (
    <View style={[Gutters.mediumHMargin]}>
      <Text style={[Fonts.textMedium, Gutters.mediumTMargin]}>
        Total Kollies
      </Text>
      <View style={[Gutters.tinyTMargin]}>
        <Controller
          control={control}
          render={({ field: { onBlur } }) => (
            <Input
              placeholder="Total Kollies"
              onChangeText={(text: string) => {
                setKollies(text);
              }}
              value={Kollies}
              onBlur={onBlur}
              keyboardType={undefined}
              style={null}
            />
          )}
          name="Kollies"
          defaultValue={totalKollies}
        />
      </View>

      <View>
        <Text style={[Fonts.textMedium, Gutters.smallTMargin]}>Name</Text>
        <View style={[Gutters.tinyTMargin]}>
          <Controller
            control={control}
            render={({ field: { onBlur, value } }) => (
              <Input
                placeholder="Name"
                onChangeText={onChangeName}
                value={value}
                onBlur={onBlur}
                keyboardType={undefined}
                style={null}
              />
            )}
            name="Name"
          />
        </View>
      </View>
    </View>
  );
};

export default TextComponent;
