import getStyles from './styles';
import { useTheme } from '@/hooks';
import Shipment from '../Shipment';
import { Header } from '@/components';
import React, { useEffect } from 'react';
import NewWorkload from '../NewWorkload';
import { useRoute } from '@react-navigation/native';
import { Text, View, useWindowDimensions } from 'react-native';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const NewWorkloadShipment = () => {
  const { Fonts, Colors, Gutters } = useTheme();
  const styles = getStyles(Colors);
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'second', title: 'Workload' },
    { key: 'first', title: 'Shipment' },
  ]);
  const [drive, setDrive] = React.useState(null);

  const route = useRoute<any>();

  useEffect(() => {
    const pageIndex: any = route.params?.index;
    setIndex(pageIndex);
  }, [route]);

  const sendDataToParents = (data: any) => {
    setDrive(data);
  };
  const FirstRoute = () => <Shipment sendDataToParents={sendDataToParents} />;

  const SecondRoute = () => <NewWorkload />;

  const renderScene = SceneMap({
    first: SecondRoute,
    second: FirstRoute,
  });
  const layout = useWindowDimensions();
  const renderTabBar = (props: any) => {
    return (
      <>
        <View style={[styles.container]}>
          <TabBar
            {...props}
            renderLabel={({ route, focused }) => (
              <View
                style={[
                  styles.tabBar,
                  {
                    backgroundColor: focused
                      ? Colors.white
                      : Colors.tabBackground,
                  },
                ]}
              >
                <Text style={[Fonts.textMediumBold]}>{route.title}</Text>
              </View>
            )}
            indicatorStyle={[styles.transprent]}
            style={[styles.tabStyle, Gutters.regularLPadding]}
            tabStyle={[styles.tabContainerStyle, Gutters.tinyLMargin]}
          />
        </View>
      </>
    );
  };
  return (
    <CustomSafeArea>
      <Header backPage="Dashboard" title={routes[index]?.title} notShowIcons={true} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </CustomSafeArea>
  );
};
export default NewWorkloadShipment;
