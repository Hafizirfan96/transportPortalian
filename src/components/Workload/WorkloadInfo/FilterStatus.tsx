import { useAppSelector, useTheme } from '@/hooks';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import getStyles from '@/screens/Workload/style';
import { wp } from '@/utils/layout-scaling';
import { workloadSelector } from '@/store/Workload';

const FilterStatus = (props: any) => {
  const { Colors, Common, Layout, Images, Gutters } = useTheme();
  const { filter } = useAppSelector(workloadSelector);
  const styles = getStyles(Colors, Layout);
  let isFilter = filter.Status.length > 0;
  return (
    <TouchableOpacity
      style={[Layout.column, styles.container]}
      onPress={props.openFilter}
      activeOpacity={0.8}
    >
      <View style={[styles.filterContainer, styles.filterIconSpacing]}>
        {!isFilter ? (
          <SvgXml xml={Images.FilterIcon} width={wp(17)} height={wp(17)} />
        ) : (
          <>
            <View style={[styles.selectedFilter]} />
            <SvgXml
              xml={Images.SelectedFilterIcon}
              width={wp(18)}
              height={wp(18)}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FilterStatus;
