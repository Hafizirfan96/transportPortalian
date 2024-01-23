import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Config } from '@/config';
import ToggleButton from '@/components/ToggleButton';
import { useTheme } from '@/hooks';
import { wp, hp } from '@/utils/layout-scaling';
import _ from 'lodash';

function TabButtons(props) {
  const { Colors, Layout } = useTheme();

  const [status, SetStatus] = useState(Config.STATUS);
  const [resetFilter, SetResetFilter] = useState(false);

  let filterStatus = Config.STATUS;
  useEffect(() => {
    console.log('useEffect-SetStatus', status);
    filterStatus = status;
  }, [status, filterStatus]);

  // useImperativeHandle(ref, () => ({
  //   reset() {
  //     console.log('reset filter-config', filterStatus)
  //     let resetStatus = status.map((x) => {
  //       return {
  //         Id: x.Id,
  //         Title: x.Title,
  //         Selected: false,
  //       }
  //     })
  //     console.log('reset filter-updated', resetStatus)
  //     SetStatus(resetStatus)
  //   },
  // }))
  const handleTypeToggle = (item, selected) => {
    console.log('handleTypeToggle', filterStatus);
    let s = _.clone(filterStatus);
    const index = status.findIndex(todo => todo.Id === item.Id);
    s[index].Selected = selected;
    let ss = s.filter(x => x.Selected);
    let filterModel = {
      Status: ss,
    };
    SetStatus(s);
    console.log('handleTypeToggle', filterModel);
    props.onSelected(filterModel);
  };

  const myconsole = () => console.log('rendering filter Modal', status);

  return (
    <>
      {/* {myconsole()} */}
      <ScrollView horizontal={true}>
        <View
          style={[
            Layout.row,
            Layout.fill,
            Layout.justifyContentBetween,
            styles.ItemWrapper,
          ]}
        >
          {filterStatus.map(item => (
            <ToggleButton
              key={item.Id}
              onChangeValue={(item, selected) =>
                handleTypeToggle(item, selected)
              }
              value={item.Selected}
              isContainerClickable={true}
              colorActive={Colors.appColor}
              text={item.Title}
              item={item}
              boxStyle={{ marginRight: wp(1), marginLeft: wp(5) }}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
//export default forwardRef(TabButtons)
export default TabButtons;

const styles = StyleSheet.create({
  ItemWrapper: {
    paddingTop: wp(0),
    paddingBottom: wp(10),
    borderBottomColor: 'gray',
    // borderBottomWidth: 1,
  },
});
