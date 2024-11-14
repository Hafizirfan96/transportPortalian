import React from 'react';
import Button from '../Button';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import SubTitle from '../SubTitle';
import { Text, View } from 'react-native';
import Input from '@/components/Input/Input';
import { useForm, Controller } from 'react-hook-form';

const KolliForm = (props: any) => {
  const { Colors, FontSize, Gutters, Layout } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addKolli = (data: any) => {
    props.sendDataToParent([...props.list, data]);
    props.toggleModal();
  };

  return (
    <View style={[styles.container]}>
      <View style={[Layout.center]}>
        <Text style={[styles.textStyle]}>Kolli Update</Text>
      </View>
      <View style={[Gutters.tinyTMargin]}>
        <SubTitle text="Kolli ID" />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={[Gutters.tinyTMargin]}>
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

      {errors.KolliID && (
        <Text style={[styles.error, Gutters.tinyTMargin]}>
          {errors?.KolliID?.message?.toString()}
        </Text>
      )}

      <View style={[styles.formView]}>
        <View style={[Gutters.smallTMargin]}>
          <SubTitle text="Weight" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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

        {errors.Weight && (
          <Text style={[styles.error, Gutters.tinyTMargin]}>
            {errors?.Weight?.message?.toString()}
          </Text>
        )}
      </View>

      <View style={[styles.formView]}>
        <View style={[Gutters.mediumTMargin]}>
          <SubTitle text="Volume" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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

        {errors.Volume && (
          <Text style={[styles.error, Gutters.tinyTMargin]}>
            {errors?.Volume?.message?.toString()}
          </Text>
        )}
      </View>

      <View style={[Layout.row, Layout.justifyContentBetween]}>
        <View style={[styles.lengthHWview, Gutters.mediumTMargin]}>
          <SubTitle text="Length" />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[Gutters.tinyTMargin]}>
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
                message: 'required',
              },
            }}
          />

          {errors.Length && (
            <Text style={[styles.error, Gutters.tinyTMargin]}>
              {errors?.Length?.message?.toString()}
            </Text>
          )}
        </View>

        <View style={[styles.lengthHWview, Gutters.mediumTMargin]}>
          <SubTitle text="Height" />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[Gutters.tinyTMargin]}>
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
                message: 'required',
              },
            }}
          />

          {errors.Height && (
            <Text style={[styles.error, Gutters.tinyTMargin]}>
              {errors?.Height?.message?.toString()}
            </Text>
          )}
        </View>

        <View style={[styles.lengthHWview, Gutters.mediumTMargin]}>
          <SubTitle text="Width" />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[Gutters.tinyTMargin]}>
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
                message: 'required',
              },
            }}
          />

          {errors.Width && (
            <Text style={[styles.error, Gutters.tinyTMargin]}>
              {errors?.Width?.message?.toString()}
            </Text>
          )}
        </View>
      </View>

      <View style={[Gutters.regularBMargin]}>
        <Button title="Add Kolli" handleSubmit={handleSubmit(addKolli)} />
      </View>
    </View>
  );
};

export default KolliForm;
