import { useTheme } from '@/hooks';
import { Image } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { wp } from '@/utils/layout-scaling';
import { navigateBack } from '@/navigators/Root';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ExternalLinks = ({ route }: any) => {
  const { Colors, Fonts, Layout, Images, Gutters } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const link = route.params.item;
  const styles = getStyles();

  const loader = () => <ActivityIndicator size={35} color={Colors.primary} />;

  const goBack = () => {
    navigateBack();
  };
  return (
    <CustomSafeArea>
      <View style={[Gutters.smallPadding, Layout.alignItemsEnd]}>
        <TouchableOpacity
          onPress={goBack}
          style={[styles.container, Layout.alignItemsEnd]}
        >
          <Image source={Images.crossIcon} style={[styles.corssImage]} />
        </TouchableOpacity>
      </View>
      {loading && <View style={[Layout.center, Layout.fill]}>{loader()}</View>}

      {error ? (
        <View style={[Layout.center, Layout.fill]}>
          <Text style={[Fonts.textRegular, { color: Colors.error }]}>
            Failed to load the page
          </Text>
        </View>
      ) : (
        <WebView
          source={{ uri: link }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          style={[Layout.fill]}
        />
      )}
    </CustomSafeArea>
  );
};
const getStyles = () => {
  return StyleSheet.create({
    container: {
      width: wp(40),
    },
    image: {
      width: wp(10),
      height: wp(20),
    },
    corssImage: {
      width: wp(16),
      height: wp(16),
    },
  });
};
export default ExternalLinks;
