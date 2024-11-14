import React from 'react';
import LorryCard from './LorryCard';
import EmptyList from '../EmptyList';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useTheme } from '@/hooks';
import getStyles from '@/screens/VehicleDetail/styles';
import { FlatList, RefreshControl, View } from 'react-native';
import { setDamageDesc, setDamageFiles } from '@/store/appState';

const LorryList = ({
  lorryStart,
  lorryEnd,
  lorry,
  isLoading,
  onRefresh,
}: {
  lorryStart: any;
  lorryEnd: any;
  lorry: any;
  isLoading: any;
  onRefresh: any;
}) => {
  const dispatch = useAppDispatch();
  const { Colors } = useTheme();
  const styles = getStyles(Colors);

  useEffect(() => {
    return () => {
      dispatch(setDamageFiles([]));
      dispatch(setDamageDesc(''));
    };
  }, []);

  const renderItemCall = useCallback(
    ({ item, index }: { item: any; index: number }) =>
      renderItem({ item, index }),
    [],
  );
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.lorry}>
        <LorryCard
          index={index}
          lorry={item}
          lorryStart={lorryStart}
          lorryEnd={lorryEnd}
          // capacity={item.capacity}
          // distance={item.distance}
          // togglebutton={item.togglebutton}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={lorry}
      renderItem={renderItemCall}
      // keyExtractor={item => item.Id}
      ListEmptyComponent={
        !isLoading && <EmptyList text="No lorry is available." />
      }
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    />
  );
};

export default LorryList;
