import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
// import { Modalize } from 'react-native-modalize'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
}

const DropdownWithModal = (props: any) => {
  const DropdownButton = useRef();
  const modalizeRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    //visible ? setVisible(false) : openDropdown()
    //modalizeRef.current.open()
    props.openModal();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}
      >
        <Text style={styles.buttonText}>
          {(selected && selected.label) || props.label}
        </Text>

        <FontAwesome name="chevron-down" style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
    borderWidth: 1,
    flex: 1,
    position: 'relative',
  },
  buttonText: {
    flex: 1,
    //textAlign: 'center',
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    flex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default DropdownWithModal;
