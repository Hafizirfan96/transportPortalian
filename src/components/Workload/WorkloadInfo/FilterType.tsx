import { ToggleButton } from '@/components';
import { View } from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Config } from '@/Config';
import { useTheme } from '@/hooks';
import getStyles from '@/screens/Workload/style';

const FilterType = (props: any, ref: any) => {
  const { Colors, Layout, Gutters } = useTheme();
  const styles = getStyles(Colors, Layout);
  const [filterType, setType] = useState(Config.FILTER_TYPE);
  useEffect(() => {}, [Config.FILTER_TYPE]);
  const resetFilterType = () => {
    setType(prevFilterType => {
      return prevFilterType.map(filter => {
        return { ...filter, Selected: false };
      });
    });
  };
  useImperativeHandle(ref, () => ({
    reset() {
      resetFilterType();
    },
  }));

  return (
    <View style={[Layout.row, Layout.fill, styles.ItemWrapper]}>
      {filterType.map(item => (
        <ToggleButton
          key={item.Id}
          onPress={props.handleTypeToggle}
          value={item.Id}
          text={item.Title}
          checked={item.Selected}
          style={styles.filters}
        />
      ))}
    </View>
  );
};

export default forwardRef(FilterType);
