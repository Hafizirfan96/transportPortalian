import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import getStyles from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { wp } from '@/utils/layout-scaling';
import moment from 'moment';

function WorkloadHistory(props: any) {
  const { Common, Layout, Fonts, Gutters, Colors } = useTheme();
  const styles = getStyles();
  const dispatch = useAppDispatch();

  const data = [
    {
      EndDateTime: '2023-08-31T09:04:31.94',
      ProductName: 'Delivered',
      Quantity: 1,
    },
    {
      EndDateTime: '2023-08-31T09:04:31.94',
      ProductName: 'Extra',
      Quantity: 6,
    },
  ];
  const kolies = [
    {
      KTId: 26,
      KolliInfo: [[1], [2]],
      ProjectId: 15,
      Status: 4,
      WorkloadGuId: 'd73599a5-e7e0-4d85-9251-edd51f0e2080',
    },
    {
      KTId: 13,
      KolliInfo: [[9], [5]],
      ProjectId: 2,
      Status: 4,
      WorkloadGuId: '8a54c4e1-be6f-4d4e-a124-6790e4954949',
    },
  ];

  useEffect(() => {
    var array: number[] = [];
    kolies.map((item: { KTId: number }) => {
      array.push(item.KTId);
    });
    let ktid = array.join();
    const payload = {
      kTId: ktid,
    };
    // dispatch(getProductHistory(payload));
  }, []);

  type ItemProps = {
    item: [];
  };
  const Item = ({ item }: ItemProps) => {
    var time = moment().format('HH:mm');
    var date = moment().format('DD-MM-YYYY');
    return (
      <View
        style={[
          Common.card,
          Gutters.mediumHMargin,
          Gutters.smallPadding,
          styles.itemContiner,
        ]}
      >
        <View style={[Layout.row]}>
          <View style={[]}>
            <Text style={Fonts.textSmallBold}>Product Name</Text>
          </View>
          <View style={[Layout.fill, Layout.row, Layout.justifyContentEnd]}>
            <FeatherIcon
              name="clock"
              size={wp(12)}
              color={Colors.primaryTextColor}
              style={[styles.timeIcon]}
            />
            {/* <Text style={Fonts.textSmallBold}>Date/Time</Text> */}
            <Text style={Fonts.textSmallBold}>
              {date} {time}
            </Text>
          </View>
        </View>
        <View style={[Layout.row]}>
          <View style={[Layout.fill]}>
            <Text style={[Fonts.textSmallBold]}>{item.ProductName}</Text>
          </View>
          <View style={[Layout.alignItemsCenter]}>
            {/* <Text style={[Fonts.textSmallBold]}>Price</Text>
            <Text style={[Fonts.textTiny]}>40 USD</Text> */}
          </View>

          <View style={[Layout.alignItemsEnd, styles.priceFlex]}>
            <Text style={[Fonts.textSmallBold]}>Quantity</Text>
            <View style={[styles.quantity]}>
              <Text style={[Fonts.textTiny]}>{item.Quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      // keyExtractor={item => item.id}
    />
  );
}

export default WorkloadHistory;
