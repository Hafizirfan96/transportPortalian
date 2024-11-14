import React, { useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '@/hooks';
import { Header } from '@/components';
import getStyles from './styles';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import EndTourScreen from '../EndTour';
import WorkloadHistory from '../WorklodHistory';

const EndTourAndWorkloadHistory = ({ route }: { route: any }) => {
  const { Layout, Colors } = useTheme();
  const styles = getStyles(Colors);
  const [index, setIndex] = React.useState(1);
  const [color, setColor] = useState(Colors.appColor);

  const [routes] = React.useState([
    { key: 'first', title: 'workload History' },
    { key: 'second', title: 'End Tour' },
  ]);

  const FirstRoute = () => <EndTourScreen route={route} />;

  const SecondRoute = () => {
    return (
      <View>
        <WorkloadHistory />
      </View>
    );
  };

  const renderScene = SceneMap({
    first: SecondRoute,
    second: FirstRoute,
  });
  const layout = useWindowDimensions();
  const renderTabBar = (props: any) => {
    return (
      <>
        <View style={{}}>
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
                    fontWeight: focused ? '400' : '400',
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
              height: 5,
            }}
            style={[styles.tabBar, Layout.alignSelfCenter]}
          />
        </View>
      </>
    );
  };
  return (
    <CustomSafeArea>
      <Header title={route?.params?.Name} backPage="Tour" />
      <>
        <View style={[Layout.fill]}>
          <EndTourScreen route={route} />
          {/* <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          /> */}
        </View>
      </>
    </CustomSafeArea>
  );
};
export default EndTourAndWorkloadHistory;
