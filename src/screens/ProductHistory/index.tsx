import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import getStyles from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { wp } from '@/utils/layout-scaling';
import { getProductHistory } from '@/store/productHistory/productHistoryInfo';
import { productHistorySelector } from '@/store/productHistory';
import moment from 'moment';
import EmptyList from '@/components/EmptyList';

function ProductHistory(props: any) {
  const { Common, Layout, Fonts, Gutters, Colors } = useTheme();
  const styles = getStyles(Colors);
  const dispatch = useAppDispatch();
  const { poductHistoryData } = useAppSelector(productHistorySelector);
  useEffect(() => {
    var array: number[] = [];
    props.params.map((item: { KTId: number }) => {
      array.push(item.KTId);
    });
    let ktid = array.join();
    const payload = {
      kTId: ktid,
    };
    dispatch(getProductHistory(payload));
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
    <>
      <View style={[styles.whiteSpace]} />
      <FlatList
        data={poductHistoryData}
        renderItem={({ item }) => <Item item={item} />}
        // keyExtractor={item => item.id}
        ListEmptyComponent={
          <EmptyList text="No product history is available." />
        }
      />
    </>
  );
}

export default ProductHistory;
