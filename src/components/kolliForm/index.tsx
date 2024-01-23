import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks';
import getStyles from './styles';
import { useForm, Controller } from 'react-hook-form';

import Input from '../Input/Input';

const KolliForm = (props: any) => {
  const { Colors, FontSize, Gutters, Layout, Common } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addKolli = (data: any) => {
    props.sendDataToParent([...props.list, data]);
    props.toggleModal();
    // reset();
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.formView]}>
        <Text
          style={[
            styles.textStyle,
            Gutters.smallTMargin,
            Gutters.regularLMargin,
          ]}
        >
          Kolli ID
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                placeholder="3023"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                keyboardType={true}
              />
            </View>
          )}
          name="KolliID"
          rules={{
            required: {
              value: true,
              message: 'KolliID is required.',
            },
          }}
        />
        <View style={[styles.errorView]}>
          {errors.KolliID && (
            <Text style={[styles.error, Gutters.smallLMargin]}>
              {errors?.KolliID?.message}
            </Text>
          )}
        </View>
      </View>

      <View style={[styles.formView]}>
        <Text
          style={[
            styles.textStyle,
            Gutters.smallTMargin,
            Gutters.regularLMargin,
          ]}
        >
          Weight
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                placeholder="Weight"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                keyboardType={true}
              />
            </View>
          )}
          name="Weight"
          rules={{
            required: {
              value: true,
              message: 'Weight is required.',
            },
          }}
        />
        <View style={[styles.errorView]}>
          {errors.Weight && (
            <Text style={[styles.error, Gutters.smallLMargin]}>
              {errors?.Weight?.message}
            </Text>
          )}
        </View>
      </View>

      <View style={[styles.formView]}>
        <Text
          style={[
            styles.textStyle,
            Gutters.smallTMargin,
            Gutters.regularLMargin,
          ]}
        >
          Volume
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                placeholder="Volume"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                keyboardType={true}
              />
            </View>
          )}
          name="Volume"
          rules={{
            required: {
              value: true,
              message: 'Volume is required.',
            },
          }}
        />
        <View style={[styles.errorView]}>
          {errors.Volume && (
            <Text style={[styles.error, Gutters.smallLMargin]}>
              {errors?.Volume?.message}
            </Text>
          )}
        </View>
      </View>
      <View style={[Layout.alignItemsCenter]}>
        <Text
          style={[
            styles.textStyle,
            Gutters.smallTMargin,
            Gutters.regularLMargin,
          ]}
        >
          =
        </Text>
      </View>

      <View style={[Layout.row]}>
        <View style={[styles.lengthHWview]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
              Gutters.tinyVMargin,
            ]}
          >
            Length
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Length"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={true}
                />
              </View>
            )}
            name="Length"
            rules={{
              required: {
                value: true,
                message: 'Length is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.Volume && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.Volume?.message}
              </Text>
            )}
          </View>
        </View>
        <View style={[Layout.alignSelfCenter, Gutters.smallLMargin]}>
          <Text style={[styles.textStyle, Gutters.mediumTMargin]}> * </Text>
        </View>
        <View style={[styles.lengthHWview]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
              Gutters.tinyVMargin,
            ]}
          >
            Height
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Height"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={true}
                />
              </View>
            )}
            name="Height"
            rules={{
              required: {
                value: true,
                message: 'Height is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.Height && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.Height?.message}
              </Text>
            )}
          </View>
        </View>
        <View style={[Layout.alignSelfCenter, Gutters.smallLMargin]}>
          <Text style={[styles.textStyle, Gutters.mediumTMargin]}> * </Text>
        </View>
        <View style={[styles.lengthHWview]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
              Gutters.tinyVMargin,
            ]}
          >
            Width
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Width"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={true}
                />
              </View>
            )}
            name="Width"
            rules={{
              required: {
                value: true,
                message: 'Width is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.Width && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.Width?.message}
              </Text>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(addKolli)}
        style={[
          Common.button.fullRounded,
          styles.container,
          Gutters.smallBMargin,
        ]}
      >
        <Text style={Common.button.buttonText}>Add Kolli</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KolliForm;
