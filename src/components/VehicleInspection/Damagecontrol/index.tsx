import getStyles from './styles';
import React, { FC } from 'react';
import { Config } from '@/Config';
import { useTheme } from '@/hooks';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import useDamageControl from '@/hooks/useDamageControl';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Damagecontrol: FC = () => {
  const styles = getStyles();
  const { Images } = useTheme();
  const {
    damages,
    selectedIndex,
    setSelectedIndex,
    loadingImages,
    setLoadingImages,
    handleImageLoad,
    visible,
    setIsVisible,
    handleScroll,
  } = useDamageControl();

  return (
    <View style={styles.container}>
      <View style={styles.damageCard}>
        <Text style={styles.damageCardText}>Damage control:</Text>
      </View>
      {/* { togglebutton && ( */}
      <View style={styles.damageBody}>
        {damages?.length > 0 && (
          <View>
            <ScrollView
              horizontal
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {damages?.map((damage: any, index: number) => (
                <View key={index} style={styles.imageContainer}>
                  {loadingImages[index] && (
                    <ActivityIndicator
                      style={styles.loader}
                      size="large"
                      color="#ffffff"
                    />
                  )}
                  {
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisible(true);
                        setSelectedIndex(index);
                      }}
                    >
                      {loadingImages[index] !== undefined && (
                        <FastImage
                          source={{
                            uri: `${Config.API_URL}${damage?.Files[0]?.FileUploadedName}`,
                            priority: FastImage.priority.normal,
                          }}
                          style={styles.image}
                          onLoadStart={() => {
                            const newLoadingImages = [...loadingImages];
                            newLoadingImages[index] = true;
                            setLoadingImages(newLoadingImages);
                          }}
                          onLoadEnd={() =>
                            loadingImages[index] !== undefined &&
                            handleImageLoad(index)
                          }
                          onError={() => handleImageLoad(index, true)}
                        />
                      )}
                      {loadingImages[index] === undefined && (
                        <FastImage
                          style={styles.image}
                          source={Images.notFound}
                        />
                      )}
                    </TouchableOpacity>
                  }
                </View>
              ))}
              {/* {damages.length > 0 && <Button title='See all' bodyStyle={styles.seeAllButton} handleSubmit={()=> navigate('DamageGallery')} />} */}
            </ScrollView>
          </View>
        )}
      </View>
      {/* )} */}
      {visible && (
        <ImageView
          images={
            damages?.[selectedIndex]?.Files
              ? damages[selectedIndex]?.Files.map(f => ({
                  uri: `${Config.API_URL}${f.FileUploadedName}`,
                }))
              : ''
          }
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          FooterComponent={({ imageIndex }) => {
            const { AddedDate, EmployeeName, DamageDetail, Files } =
              damages?.[selectedIndex];
            const date = new Date(AddedDate);
            return (
              <View style={styles.imageViewFooter}>
                <View style={styles.row}>
                  <Text style={styles.footerTextHeading}>Date:</Text>
                  <Text style={styles.footerText}>
                    {date.toLocaleDateString()} - {date.toLocaleTimeString()}
                  </Text>
                  {Files?.length > 0 && (
                    <Text>
                      Image: {imageIndex + 1}/{Files?.length}
                    </Text>
                  )}
                </View>
                <View style={styles.row}>
                  <Text style={styles.footerTextHeading}>Uploded By:</Text>
                  <Text style={styles.footerText}>{EmployeeName}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.footerTextHeading}>Description:</Text>
                  <Text style={styles.footerText}>{DamageDetail}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Damagecontrol;
