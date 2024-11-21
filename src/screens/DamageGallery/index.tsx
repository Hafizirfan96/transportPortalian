import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { vehicleInspectionService } from '@/services/vehicleInspection';
import { Config } from '@/config';
import { FileEntityType } from '@/enums';
import { useAppSelector, useTheme } from '@/hooks';
import { getSelectedVehicleId } from '@/store/vehicle';
import { wp } from '@/utils/layout-scaling';
import { navigateBack } from '@/navigators/Root';
import ImageView from 'react-native-image-viewing';

const DamageGallery = () => {
  const styles = getStyles();
  const vId = useAppSelector(getSelectedVehicleId);
  const { Images } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filters] = useState({
    EntityId: vId,
    CurrentPage: 1,
    PageSize: 50,
    EntityType: FileEntityType.Damage,
    SortOrder: 1,
    SortBy: 0,
  });

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await vehicleInspectionService.getDamageImages({
        ...filters,
        CurrentPage: pageNum,
      });
      const items = response.Items;
      if (items.length > 0) setData(prev => [...prev, ...items]);
      else setHasMore(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const loadMoreData = () => {
    if (!hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
            setSelectedIndex(index);
          }}
        >
          <Image
            source={{ uri: `${Config.API_URL}${item.FileUploadedName}` }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const goBack = () => {
    navigateBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.damageHeader}>
        <TouchableOpacity onPress={goBack} style={styles.cancelContainer}>
          <Image source={Images.crossIcon} style={styles.corssImage} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.FileGuId}
        numColumns={3}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
      <ImageView
        images={data?.map(f => ({
          uri: `${Config.API_URL}${f.FileUploadedName}`,
        }))}
        imageIndex={selectedIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={({ imageIndex }) => {
          const { FileCreateDate, Username, FileDescription } =
            data[imageIndex];
          const date = new Date(FileCreateDate);
          return (
            <View style={styles.imageViewFooter}>
              <View style={styles.row}>
                <Text style={styles.footerTextHeading}>Date:</Text>
                <Text style={styles.footerText}>
                  {date.toLocaleDateString()} - {date.toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.footerTextHeading}>Username:</Text>
                <Text style={styles.footerText}>{Username}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.footerTextHeading}>Description:</Text>
                <Text style={styles.footerText}>{FileDescription}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const getStyles = () => {
  const { Fonts, Layout, Colors, Gutters } = useTheme();

  return StyleSheet.create({
    damageHeader: {
      ...Gutters.smallPadding,
      ...Layout.alignItemsEnd,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
    },
    cancelContainer: {
      width: wp(40),
      ...Layout.alignItemsEnd,
    },
    corssImage: {
      width: wp(16),
      height: wp(16),
    },
    item: {
      width: '33%',
      margin: 1,
    },
    image: {
      aspectRatio: 1,
    },
    imageViewFooter: {
      ...Gutters.smallPadding,
      backgroundColor: Colors.lightGrey,
    },
    row: {
      ...Layout.rowHCenter,
      gap: 4,
    },
    footerTextHeading: {
      ...Fonts.textSmallBold,
    },
    footerText: {
      ...Fonts.textTiny,
    },
  });
};

export default DamageGallery;
