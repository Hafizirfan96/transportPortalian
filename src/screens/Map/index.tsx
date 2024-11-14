import getStyles from './style';
import { Config } from '@/Config';
import Mapbox from '@rnmapbox/maps';
import { Header } from '@/components';
import React, { useEffect, useState } from 'react';
import { workloadSelector } from '@/store/Workload';
import { myWorkloads } from '@/store/Workload/workloadApi';
import Geolocation from 'react-native-geolocation-service';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Image,
} from 'react-native';

const mapKey = Config.KEYS.API_KEY;
Mapbox.setAccessToken(mapKey);

const MapboxScreen = () => {
  const { Layout, Colors, Images } = useTheme();
  const styles = getStyles(Colors);
  const [zoomLevel, setZoomLevel] = useState(6);
  const { workloadData, isLoading } = useAppSelector(workloadSelector);
  const [coordinate, setCordinate] = useState([]);
  const [showCallout, setShowCallout] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(myWorkloads());
  }, []);

  useEffect(() => {
    if (workloadData) {
      const coordinates = workloadData
        .map(item => {
          if (item.WorkloadLatlng) {
            const [latitude, longitude] =
              item.WorkloadLatlng.split(',').map(Number);
            if (!isNaN(latitude) && !isNaN(longitude)) {
              return {
                latitude,
                longitude,
                address: item.Address,
                status: item.Status,
              };
            }
          }
          return null;
        })
        .filter(coords => coords !== null);

      setCordinate(coordinates);
    }
  }, [workloadData]);

  useEffect(() => {
    requestPermissions();
    fetchLocation();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
      }
    }
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // Use position data as needed
      },
      error => {
        console.log('Error fetching location:', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const zoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 1, 20));
  };

  const zoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 1, 0));
  };

  const handleMarkerPress = coords => {
    setSelectedCoords(coords);
    setShowCallout(true);
  };

  const Marker = React.memo(({ coords }: any) => (
    <Mapbox.MarkerView
      coordinate={[coords.latitude, coords.longitude]}
      id={`workload-${coords.latitude}-${coords.longitude}`}
    >
      <View style={[Layout.center]}>
        <TouchableOpacity onPress={() => handleMarkerPress(coords)}>
          <Image
            source={
              coords.status === Config.WORKLOAD_STATUS.NEW
                ? Images.pinBlack
                : coords.status === Config.WORKLOAD_STATUS.STARTED
                  ? Images.pinYellow
                  : Config.WORKLOAD_STATUS.COMPLETED
                    ? Images.pinGreen
                    : null
            }
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showCallout && selectedCoords === coords && (
          <View style={[styles.calloutContainer, Layout.center]}>
            <Text style={styles.calloutText}>{coords.address}</Text>
          </View>
        )}
      </View>
    </Mapbox.MarkerView>
  ));

  const getCenterCoordinate = () => {
    const total = coordinate.reduce(
      (acc, curr) => {
        acc.latitude += curr.latitude;
        acc.longitude += curr.longitude;
        return acc;
      },
      { latitude: 0, longitude: 0 },
    );
    return [
      total.latitude / coordinate.length,
      total.longitude / coordinate.length,
    ];
  };
  return (
    <CustomSafeArea>
      <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
        <Header title="Map" />
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Mapbox.MapView style={styles.map}>
            <Mapbox.Camera
              zoomLevel={zoomLevel}
              centerCoordinate={getCenterCoordinate()}
            />
            {coordinate?.map((coords, index) =>
              coords.latitude && coords.longitude ? (
                <Marker key={`workload-${index}`} coords={coords} />
              ) : null,
            )}
          </Mapbox.MapView>
        )}

        <View style={styles.zoomContainer}>
          <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
            <Text style={styles.zoomText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default MapboxScreen;
