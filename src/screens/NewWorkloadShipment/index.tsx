import React, { useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '@/hooks';
import { Header, NewWorkloadComponents } from '@/components';
import getStyles from './styles';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Shipment from '../Shipment';

const NewWorkloadShipment = () => {
  const { Fonts, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);
  const [index, setIndex] = React.useState(1);
  const [color, setColor] = useState(Colors.appColor);
  const [title, setTitle] = useState('');

  const [routes] = React.useState([
    { key: 'first', title: 'Shipment' },
    { key: 'second', title: 'New Workload' },
  ]);
  const [drive, setDrive] = React.useState(null); // the lifted state

  const sendDataToNewWorkload = data => {
    console.log('index----', data);
    setDrive(data);
  };
  const FirstRoute = () => <NewWorkloadComponents drive={drive} />;

  const SecondRoute = () => (
    <Shipment sendDataToNewWorkload={sendDataToNewWorkload} />
  );

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
                // setTitle('Added Workload List');
              } else {
                setColor('#43F8B6');
                // setTitle('');
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
      <Header title={title} backPage="Dashboard" />
      <>
        <View style={[styles.container, Layout.fill]}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </>
    </CustomSafeArea>
  );
};
export default NewWorkloadShipment;
