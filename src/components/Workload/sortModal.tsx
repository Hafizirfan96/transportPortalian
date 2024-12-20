import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import { View } from 'react-native';
import { useAppSelector, useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import { Config } from '@/Config';
import RadioButtonWithText from '../RadioButtonWithText';
import { workloadSelector } from '@/store/Workload';

function SortModal(props: any, ref: any) {
  const { Layout, Gutters } = useTheme();
  const modalizeRef = useRef(null);
  const [sort, SetSort] = useState(props.selected);

  useImperativeHandle(ref, () => ({
    open() {
      modalizeRef.current?.open();
    },
    reset() {
      SetSort(3);
    },
  }));
  const handleSortToggle = (item: any) => {
    SetSort(item.Id);
    props.onSelected(item);
    modalizeRef.current?.close();
  };
  const myconsole = () => console.log('rendering sort Modal');
  return (
    <>
      {/* {myconsole()} */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        withHandle={false}
        avoidKeyboardLikeIOS={true}
      >
        <View>
          <View style={[Layout.column, Gutters.regularVPadding]}>
            {Config.FILTER_SORT.map((item: any) => {
              return (
                <View
                  style={[
                    Layout.row,
                    Gutters.regularHPadding,
                    Gutters.smallVPadding,
                  ]}
                  key={item.Id}
                >
                  <RadioButtonWithText
                    text={item.Title}
                    isChecked={item.Id == sort}
                    onCheck={() => handleSortToggle(item)}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </Modalize>
    </>
  );
}

export default forwardRef(SortModal);
