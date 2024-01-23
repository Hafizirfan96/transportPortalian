import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { Header, ShiftToggler, ShiftTimer } from '@/components';
import { shiftSelector } from '@/store/shift';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { dashboardSelector } from '@/store/dashboard';
import getStyles from './style';
import { myStartedShifts } from '@/store/shift/shiftThunk';
import { dashboardScheduleInfo } from '@/store/dashboard/scheduleInfo';
import { navigate } from '@/navigators/Root';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

function DashboardScreen() {
  const { Colors, Layout, Fonts, Gutters, Images, Common } = useTheme();
  const styles = getStyles(Colors, Fonts);
  const { scheduleInfo, status: scheduleInfoStatus } =
    useAppSelector(dashboardSelector);
  const { myStartShiftData: shiftInfo, isLoading } =
    useAppSelector(shiftSelector);

  const [color, setColor] = useState(Colors.appColor);
  // const [index, setIndex] = React.useState(1);
  // const [routes] = React.useState([
  //   { key: 'first', title: 'Last Month' },
  //   { key: 'second', title: 'Last Week' },
  //   // { key: 'second', title: 'This Week' },
  // ]);
  const isShiftStarted = shiftInfo !== null;

  const dispatch = useAppDispatch();
  const currentHour = new Date().getHours();
  let greetingMessage = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Evening';
  }
  useEffect(() => {
    dispatch(dashboardScheduleInfo());
    // dispatch(myStartedShifts());
  }, []);

  const _renderScheduleInfo = () => {
    if (!scheduleInfo) {
      return;
    }
    return (
      <>
        <View
          style={[
            Gutters.mediumPadding,
            Common.card,
            Common.contentWrapperDashboard,
          ]}
        >
          <View style={[Layout.row]}>
            <Image source={Images.avatar} style={styles.avtar} />
            <View style={[Gutters.regularLMargin]}>
              <Text style={styles.authorText}>
                {scheduleInfo?.EmployeeName}
              </Text>
              <Text style={styles.scheduleText}>Scheduled to work at DHL</Text>
              {isShiftStarted || (
                <Text style={[Fonts.textSmallBold]}>
                  {scheduleInfo?.StartTime} - {scheduleInfo?.EndTime}
                </Text>
              )}
            </View>
          </View>

          {isShiftStarted && shiftInfo !== null && (
            <ShiftTimer start={shiftInfo?.StartDateTime} />
          )}
        </View>
        <View style={[Gutters.largeRMargin, styles.shiftToggler]}>
          <ShiftToggler
            isShiftStarted={isShiftStarted}
            isLoading={isLoading}
            shiftInfo={shiftInfo}
          />
        </View>
      </>
    );
  };
  const handleShiftDetailNavigation = () => {
    navigate('ShiftDetails');
  };
  const shiftDetail = () => {
    return (
      <View style={[Layout.row, Layout.justifyContentEvenly, { bottom: 40 }]}>
        <TouchableOpacity onPress={handleShiftDetailNavigation}>
          <Image
            source={Images.shiftDetailsIcon}
            style={[Layout.alignSelfCenter, styles.shiftImage]}
          />
          <Text style={[Fonts.textTinyBold]}>Shift Details</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={Images.upcomingShiftIcon}
            style={[Layout.alignSelfCenter, styles.shiftImage]}
          />
          <Text style={[Fonts.textTinyBold]}>Upcoming</Text>
          <Text style={[Gutters.smallLMargin, Fonts.textTinyBold]}>Shift</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={Images.leaveIcon}
            style={[Layout.alignSelfCenter, styles.shiftImage]}
          />
          <Text style={[Fonts.textTinyBold]}>Leave</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      image: Images.avatar,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: Images.avatar,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: Images.avatar,
    },
    {
      id: '58694a0f-3da1-471f-bd96571e29d72',
      image: Images.avatar,
    },
  ];
  const Item = ({ image }) => (
    <View style={[styles.listItem]}>
      <Image source={image} style={[styles.listImage]} />
    </View>
  );
  const renderTabBar = (props: any) => {
    return (
      <>
        <View style={[styles.tabbars]}>
          <TabBar
            onTabPress={({ route }) => {
              if (route.key == 'first') {
                setColor('#43F8B6');
              } else {
                setColor('#43F8B6');
              }
              return null;
            }}
            renderLabel={({ route, focused }) => (
              <Text
                style={[
                  styles.title,
                  {
                    color: focused ? Colors.appColor : Colors.appColor,
                    fontWeight: focused ? '500' : '400',
                    opacity: focused ? 1 : 0.5,
                  },
                ]}
              >
                {route.title}
              </Text>
            )}
            {...props}
            indicatorStyle={{
              backgroundColor: color,
            }}
            style={[styles.tabBar, Layout.alignSelfCenter]}
          />
        </View>
      </>
    );
  };
  const SecondRoute = () => (
    <View style={{}}>
      <Text style={[Fonts.textSmallBold]}>Last Month</Text>
    </View>
  );
  const FirstRoute = () => (
    <View style={{}}>
      <Text style={[Fonts.textSmallBold]}>tab Workloads</Text>
    </View>
  );
  const renderScene = SceneMap({
    first: SecondRoute,
    second: FirstRoute,
  });
  const layout = useWindowDimensions();
  return (
    <CustomSafeArea>
      <Header title="Dashboard" titleMessage={greetingMessage} />
      <View style={[Layout.fill, styles.container]}>
        {scheduleInfoStatus === 'pending' && (
          <ActivityIndicator size="large" color={Colors.white} />
        )}
        {scheduleInfoStatus === 'succeeded' && _renderScheduleInfo()}
        {/* {shiftDetail()}
        <View
          style={[
            styles.flatListView,
            Gutters.mediumMargin,
            styles.workingList,
          ]}
        >
          <Text style={[Fonts.textSmallBold]}>Who's Working Today</Text>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item image={item.image} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        /> */}
      </View>
    </CustomSafeArea>
  );
}

export default DashboardScreen;
