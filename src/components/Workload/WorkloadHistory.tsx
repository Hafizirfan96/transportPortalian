import { useTheme } from '@/hooks';
import getStyles from '@/screens/WorklodHistory/style';
import { wp } from '@/utils/layout-scaling';
import moment from 'moment';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EmptyList from '../EmptyList';

const WorkloadHistoryComponent = ({ data }: { data: any }) => {
  const { Common, Layout, Fonts, Gutters, Colors } = useTheme();
  const styles = getStyles();

  const Item = ({ item }: any) => {
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
            <Text style={Fonts.textSmallBold}>Worload Name</Text>
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
      ListEmptyComponent={
        <EmptyList text="No workload history is available." />
      }
    />
  );
};

export default WorkloadHistoryComponent;
