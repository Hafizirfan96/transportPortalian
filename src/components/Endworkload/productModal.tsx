import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { View } from 'react-native';
import { useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import RadioButtonWithText from '../RadioButtonWithText';

function ProductModal(props: any, ref: any) {
  const { Layout, Gutters } = useTheme();
  const modalizeRef = useRef(null);
  console.log('props', props);
  const [sort, SetSort] = useState(props.selected);

  useImperativeHandle(ref, () => ({
    open() {
      modalizeRef.current?.open();
    },
    setSelectedValue(value: any) {
      SetSort(value);
    },
  }));
  const handleSortToggle = (item: any) => {
    console.log('handleSortToggle', item);
    SetSort(item.Id);
    // props.onSelected(item)
    modalizeRef.current?.close();
  };
  const renderItem = (item: any) => {
    console.log('product item', item.item);
    return (
      <View
        style={[Layout.row, Gutters.regularHPadding, Gutters.smallVPadding]}
      >
        <RadioButtonWithText
          text={item.item.ProductName}
          isChecked={item.item.ProductId == sort}
          onCheck={() => handleSortToggle(item)}
        />
      </View>
    );
  };

  return (
    <>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        withHandle={false}
        avoidKeyboardLikeIOS={true}
        flatListProps={{
          data: props.products,
          renderItem: renderItem,
          keyExtractor: item => item.ProductId,
          showsVerticalScrollIndicator: false,
        }}
      />
    </>
  );
}

export default forwardRef(ProductModal);
