import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import getStyles from './styles';
import { useTheme } from '@/hooks';

const Reference = props => {
  // console.log('ref---', props.reference);
  const { Layout, Colors, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const reference = props.reference;
  const onChangeReference = text => {
    props.onReference(text);
  };
  const onChangeKm = text => {
    props.onChangeKm(text);
  };
  const onChangeDistance = text => {
    props.onSumDistance(text);
  };
  return (
    <View style={styles.marginhorizontal}>
      <Text style={[styles.textStyle]}>Reference</Text>
      <View style={[styles.referenceView]}>
        <TextInput
          placeholder="Optional"
          onChangeText={onChangeReference}
          // value={reference.ref}
          style={[styles.referenceInputText]}
          keyboardType="number-pad"
          // onBlur={onBlur}
        >
          {reference.ref}
        </TextInput>
      </View>

      <View style={[Layout.row, Layout.justifyContentBetween, { bottom: 15 }]}>
        <View>
          <Text style={[styles.distanceHeading]}>Killometer</Text>
          <View style={[styles.InputTextItem]}>
            <View style={[styles.referenceView]}>
              <TextInput
                placeholder="30 Km"
                onChangeText={onChangeKm}
                //  value={reference.km}
                style={[styles.referenceInputText]}
                keyboardType="number-pad"
                // InputRightElement={
                //   <Icon
                //     //   as={}
                //     //   name="ios-search"
                //     size={5}
                //     style={[styles.TextInputImage]}
                //   />
                // }
                // onBlur={onBlur}
              >
                {reference.km}
              </TextInput>
            </View>
            {/* <Image source={Images.notesIcon} style={[styles.TextInputImage]} /> */}
          </View>
        </View>
        <View>
          <Text style={[styles.marginleft0, styles.distanceHeading]}>
            Distance
          </Text>
          <View style={[styles.referenceView]}>
            <TextInput
              placeholder="Sum"
              onChangeText={onChangeDistance}
              // value={reference.distance}
              style={[styles.referenceInputText, styles.InputTextItem]}
              keyboardType="number-pad"
              // onBlur={onBlur}
            >
              {reference.distance}
            </TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Reference;
