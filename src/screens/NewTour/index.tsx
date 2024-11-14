import React, { useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import { useAppDispatch, useTheme } from '@/hooks';
import { Header } from '@/components';
import getStyles from './styles';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Input from '@/components/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import SelectDropdownWithSearch from '@/components/SelectDropdownWithSearch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NewTour = () => {
  const { Fonts, Layout, Colors, Gutters, Common } = useTheme();
  // const dispatch = useAppDispatch();
  const styles = getStyles(Colors);
  const [index, setIndex] = React.useState(1);
  const [color, setColor] = useState(Colors.appColor);
  const [title, setTitle] = useState('');

  const [routes] = React.useState([
    { key: 'first', title: 'Added Workloads' },
    { key: 'second', title: 'New Tour' },
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log('route----', routes[0].key == 'second');
  const onSaveClick = async (data: any) => {};
  const product = [
    {
      IsComment: true,
      IsPrice: true,
      IsQuantity: true,
      ProductId: 5,
      ProductName: 'Delivered',
      Quantity: 0,
    },
    {
      IsComment: true,
      IsPrice: true,
      IsQuantity: true,
      ProductId: 3,
      ProductName: 'pending',
      Quantity: 1,
    },
  ];
  const FirstRoute = () => (
    <View style={{}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={[styles.alignCenter]}>
            <View style={[styles.controllerChildView, Gutters.tinyTMargin]}>
              <Text style={[styles.date]}>Project</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.textContainer,
                      Gutters.smallLPadding,
                      Gutters.smallVPadding,
                      Gutters.mediumBMargin,
                      Platform.OS == 'ios'
                        ? Gutters.smallVPadding
                        : Gutters.tinyVPadding,
                    ]}
                  >
                    <SelectDropdownWithSearch
                      data={product}
                      defaultButtonText={'Search filter'}
                      dropdownIconPosition={'right'}
                      onSelect={(selectedItem, index) => {
                        onChange(selectedItem.ProductId);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.ProductName;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.ProductName;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={Colors.primaryTextColor}
                            size={18}
                          />
                        );
                      }}
                    />
                  </View>
                )}
                name="Project"
                rules={{
                  required: {
                    value: true,
                    message: 'Project is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={[styles.controllerChildView, Gutters.tinyTMargin]}>
              <Text style={[styles.date]}>Kilometre</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Kilometre"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="Kilometre"
                rules={{
                  required: {
                    value: true,
                    message: 'Kilometre is required field.',
                  },
                }}
                defaultValue=""
              />
              <View style={[styles.errorView]}>
                {errors.Kilometre && (
                  <Text style={styles.error}>{errors?.Kilometre?.message}</Text>
                )}
              </View>
            </View>
            <View style={[styles.controllerChildView, Gutters.tinyTMargin]}>
              <Text style={[styles.date]}>Reference</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Optional"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="reference"
                rules={{
                  required: {
                    value: false,
                    message: 'Optional is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit(onSaveClick)}
              style={[Common.button.fullRounded, Gutters.mediumTMargin]}
            >
              <Text style={Common.button.buttonText}>Save</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={handleSubmit(onLoginClick)}
              style={[Common.button.fullRounded, Gutters.mediumTMargin]}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.white}
                  style={Common.button.buttonText}
                />
              ) : (
                <Text style={Common.button.buttonText}>SUBMIT</Text>
              )}
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );

  const SecondRoute = () => (
    <View style={{}}>
      <Text style={[Fonts.textSmallBold]}>this screen under process</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: SecondRoute,
    second: FirstRoute,
  });
  const layout = useWindowDimensions();
  const renderTabBar = (props: any) => {
    return (
      <>
        <View style={{}}>
          <TabBar
            onTabPress={({ route }) => {
              if (route.key == 'first') {
                setColor('#43F8B6');
                setTitle('Added Workload List');
              } else {
                setColor('#43F8B6');
                setTitle('');
              }
              return null;
            }}
            renderLabel={({ route, focused }) => (
              <Text
                style={[
                  styles.title,
                  {
                    color: focused ? Colors.appColor : Colors.appColor,
                    fontWeight: focused ? '400' : '400',
                    opacity: focused ? 1 : 0.5,
                  },
                ]}
              >
                {route.title}
              </Text>
            )}
            {...props}
            indicatorStyle={{
              backgroundColor: color,
              height: 5,
            }}
            style={[styles.tabBar, Layout.alignSelfCenter]}
          />
        </View>
      </>
    );
  };
  return (
    <CustomSafeArea>
      <Header title={title} backPage="Dashboard" />
      <>
        <View style={[styles.container, Layout.fill]}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </>
    </CustomSafeArea>
  );
};
export default NewTour;
