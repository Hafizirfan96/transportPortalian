import { Config } from '@/Config';
import React from 'react';
import { View } from 'react-native';
import ToggleButton from '../ToggleButton';
import { useTheme } from '@/hooks';
import getStyles from '@/screens/Service/styles';

const ServiceFilterInfo = (props: any) => {
  const { Layout, Colors } = useTheme();

  const styles = getStyles(Colors);

  return (
    <View style={[Layout.row, Layout.fill, styles.ItemWrapper]}>
      {Config.FILTER_SERVICE.map(item => {
        return (
          <ToggleButton
            key={item.Id}
            onPress={() => props.handleTypeToggle(item.Id)}
            value={item.Id}
            text={item.Title}
            checked={item.Id === props.typeId}
            style={styles.togglebutton}
          />
        );
      })}
    </View>
  );
};

export default ServiceFilterInfo;
