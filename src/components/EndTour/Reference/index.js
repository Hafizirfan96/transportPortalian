import React from 'react';
import { View, Text } from 'react-native';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import Input from '@/components/Input/Input';

import { Controller } from 'react-hook-form';
import { wp } from '@/utils/layout-scaling';

const Reference = props => {
  const { Layout, Colors, FontSize, Gutters } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const reference = props.reference;
  const onChangeReference = text => {
    props.onReference(text);
  };

  return (
    <View style={[Gutters.mediumHMargin]}>
      <Text style={[styles.textStyle]}>Reference</Text>

      <Input
        placeholder="Optional"
        outerStyle={[Gutters.smallTMargin]}
        onChangeText={onChangeReference}
        value={reference.ref}
      />

      <View
        style={[Layout.row, styles.marginBottom, Layout.justifyContentBetween]}
      >
        <View style={[styles.marginBottom, styles.width40]}>
          {/* <View style={[{ marginTop: wp(11) }]}>
            <Text style={[styles.distanceHeading]}>Killometer</Text>
          </View>

          <Controller
            control={props.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Km"
                onChangeText={onChange}
                keyboardType="number-pad"
                outerStyle={[Gutters.tinyTMargin]}
                // innerStyle={styles.referenceInputText}
                value={value}
                validationComponent={
                  props.errors.km && (
                    <Text style={styles.error}>
                      {props.errors?.km?.message?.toString()}
                    </Text>
                  )
                }
              />
            )}
            name="km"
            rules={{
              required: {
                value: true,
                message: 'Kilometer is required field.',
              },
            }}
          /> */}
        </View>
      </View>
    </View>
  );
};
export default Reference;
