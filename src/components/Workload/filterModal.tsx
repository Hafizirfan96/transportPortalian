import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Config } from '@/Config';
import { useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import _ from 'lodash';
import CheckBox from '../CheckBox';
import { ThemeColors } from '@/Theme/theme.type';

function FilterModal(props: any, ref: any) {
  const { Colors, Common, Layout, Fonts, Gutters } = useTheme();
  const styles = getStyles(Colors);
  const modalizeRef = useRef(null);

  const [status, SetStatus] = useState(Config.STATUS);
  const [activeButton, setButton] = useState(false);
  const [filterType, SetFilterType] = useState([
    {
      Id: 1,
      Title: 'Delivery',
      Selected: false,
    },
    {
      Id: 2,
      Title: 'Pickup',
      Selected: false,
    },
    {
      Id: 3,
      Title: 'Service',
      Selected: false,
    },
  ]);

  useImperativeHandle(ref, () => ({
    open() {
      modalizeRef.current?.open();
    },
    reset() {
      console.log('reset filter');

      let newFilter = filterType.map(x => {
        return {
          Id: x.Id,
          Title: x.Title,
          Selected: false,
        };
      });
      SetFilterType(newFilter);

      let s = status.map(x => {
        return {
          Id: x.Id,
          Title: x.Title,
          Selected: false,
        };
      });
      SetStatus(s);
    },
  }));

  const onClose = () => {
    modalizeRef.current?.close();
    let selectedStatuses = status.filter(x => x.Selected).map((x: any) => x.Id);
    props.onSelected(selectedStatuses);
  };

  const handleStatusToggle = (item: any) => {
    let s = _.clone(status);
    const index = status.findIndex(todo => todo.Id === item.Id);
    s[index].Selected = !s[index].Selected;
    SetStatus(s);
    let isTrue = s.every(item => item.Selected === false);
    setButton(!isTrue);
  };

  const myconsole = () => console.log('rendering filter Modal');
  return (
    <>
      {myconsole()}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        //modalHeight={300}

        withHandle={false}
        avoidKeyboardLikeIOS={true}
      >
        <View style={[Layout.column, Gutters.regularVPadding]}>
          <View
            style={[
              Layout.row,
              Layout.fill,
              Gutters.regularBMargin,
              Gutters.regularHPadding,
            ]}
          >
            <Text style={[Fonts.textSmallBold]}>Status</Text>
          </View>
          {status.map((item: any) => (
            <View
              style={[Layout.row, Gutters.regularHPadding, styles.ItemWrapper]}
              key={item.Id}
            >
              <TouchableOpacity
                accessibilityLabel={item.Title}
                accessibilityRole="checkbox"
                style={[
                  Common.wcagHeightAA,
                  Layout.row,
                  Layout.alignItemsCenter,
                  Gutters.smallVPadding,
                ]}
                onPress={() => handleStatusToggle(item)}
                activeOpacity={0.8}
              >
                <CheckBox checked={item.Selected} addMarginRight={true} />
                <Text style={[Fonts.textTiny]}>{item.Title}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={[
              Layout.row,
              Layout.justifyContentEnd,
              Gutters.regularVMargin,
              Gutters.regularHMargin,
            ]}
          >
            <TouchableOpacity
              style={[
                Common.button.btnTinyRounded,
                {
                  backgroundColor: activeButton
                    ? Colors.primaryBackground
                    : Colors.darkgray,
                },
              ]}
              onPress={onClose}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  { color: !activeButton ? Colors.schedul : Colors.black },
                ]}
              >
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
}

export default forwardRef(FilterModal);

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    ItemWrapper: {
      borderBottomColor: colors.darkGrey,
      borderBottomWidth: 1,
    },
  });
