import axios from 'axios';
import getStyles from './style';
import { Config } from '@/Config';
import Mapbox from '@rnmapbox/maps';
import Modal from 'react-native-modal';
import { AppButton, Header } from '@/components';
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
  Linking,
} from 'react-native';

const mapKey = Config.KEYS.API_KEY;
Mapbox.setAccessToken(mapKey);

const MapboxScreen = () => {
  const { Layout, Colors, Images, Gutters, Fonts } = useTheme();
  const styles = getStyles(Colors);
  const [zoomLevel, setZoomLevel] = useState(7);
  const { workloadData, isLoading } = useAppSelector(workloadSelector);
  const [coordinate, setCoordinate] = useState([]);
  const [showCallout, setShowCallout] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [Visible, setisVisible] = useState(false);
  const dispatch = useAppDispatch();

  const fetchRoute = async () => {
    // Ensure coordinates are [longitude, latitude]
    const start = [77.5946, 12.9716]; // Example: [longitude, latitude]
    const end = [78.9629, 20.5937];
    if (!Array.isArray(start) || !Array.isArray(end)) {
      return [];
    }

    if (
      start[1] < -90 ||
      start[1] > 90 ||
      end[1] < -90 ||
      end[1] > 90 ||
      start[0] < -180 ||
      start[0] > 180 ||
      end[0] < -180 ||
      end[0] > 180
    ) {
      console.error('Invalid coordinates:', { start, end });
      return [];
    }

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${Config.KEYS.API_KEY}`;

    try {
      // console.log('Fetching route with coordinates:', { start, end });
      const response = await axios.get(directionsUrl);

      const { routes } = response?.data;
      // console.log('routes----:', routes);

      if (routes && routes.length > 0) {
        return routes[0]?.geometry.coordinates; // Returns the route's coordinates
      }
      console.log('No routes found');
      return [];
    } catch (error) {
      console.error(
        'Error fetching route:',
        error.response?.data || error.message,
      );
      return [];
    }
  };

  useEffect(() => {
    dispatch(myWorkloads());
  }, []);

  useEffect(() => {
    if (workloadData) {
      const coordinates = workloadData
        .map(item => {
          if (item?.WorkloadLatlng) {
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

      setCoordinate(coordinates);
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
  const handleOpenNavigation = coords => {
    if (!coords || !coords.latitude || !coords.longitude) {
      console.error('Invalid coordinates for navigation:', coords);
      return;
    }

    // const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`;
    // console.log('Navigation URL:', navigationUrl);

    // Linking.canOpenURL(navigationUrl)
    //   .then(supported => {
    //     if (supported) {
    //       Linking.openURL(navigationUrl);
    //     } else {
    //       console.error("Can't open URL:", navigationUrl);
    //     }
    //   })
    //   .catch(err => console.error('Error opening navigation URL:', err));
  };

  const handleMarkerPress = (coords: any) => {
    setSelectedCoords(coords);
    setisVisible(true);

    handleOpenNavigation(coords);
  };

  const Marker = React.memo(({ coords }) => {
    if (
      typeof coords.latitude !== 'number' ||
      typeof coords.longitude !== 'number'
    ) {
      return null;
    }

    return (
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
          {/* {showCallout && selectedCoords === coords && (
            <View style={[styles.calloutContainer, Layout.center]}>
              <Text style={styles.calloutText}>{coords.address}</Text>
            </View>
          )} */}
        </View>
      </Mapbox.MarkerView>
    );
  });

  const getCenterCoordinate = () => {
    if (coordinate.length === 0) return [0, 0];
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

  let route: any = [];
  let routes: any;

  coordinate?.filter(x => {
    route.push([x.latitude, x.longitude]);
    fetchRoute(x.longitude, x.latitude);
  });

  routes = {
    route: {
      id: 'route',
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          source: 'route',
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        },
      ],
    },
  };
  const handleCloseModal = () => {
    setisVisible(false);
  };

  const handleNavigate = (coords: any) => {
    setisVisible(false);
    if (!coords || !coords.latitude || !coords.longitude) {
      console.error('Invalid coordinates for navigation:', coords);
      return;
    }
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`;
    Linking.canOpenURL(navigationUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(navigationUrl);
        } else {
          console.error("Can't open URL:", navigationUrl);
        }
      })
      .catch(err => console.error('Error opening navigation URL:', err));
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
            {routes ? (
              <Mapbox.ShapeSource id={routes?.route.id} shape={routes?.route}>
                <Mapbox.LineLayer
                  id="radiusOutline"
                  style={{
                    lineColor: Colors.primary,
                    lineWidth: 4,
                    lineDasharray: [2, 2],
                    lineJoin: 'round',
                  }}
                />
              </Mapbox.ShapeSource>
            ) : null}
            {coordinate.map((coords, index) =>
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
        <Modal isVisible={Visible}>
          <View
            style={[
              Gutters.mediumPadding,
              { backgroundColor: Colors.background },
            ]}
          >
            <Text style={[Layout.alignSelfCenter, Fonts.textNormalBold]}>
              Open google navigation
            </Text>

            <View style={[Gutters.smallTMargin]}>
              <View
                style={[
                  Layout.row,
                  Layout.alignSelfCenter,
                  Gutters.tinyTMargin,
                ]}
              >
                <AppButton
                  title="Cancel"
                  handleSubmit={handleCloseModal}
                  bodyStyle={[Gutters.tinyRMargin]}
                />
                <AppButton
                  title="Open"
                  handleSubmit={() => handleNavigate(selectedCoords)}
                  bodyStyle={[Gutters.tinyRMargin]}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </CustomSafeArea>
  );
};

export default MapboxScreen;
