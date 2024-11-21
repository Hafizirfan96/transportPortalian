import getStyles from './styles';
import { useTheme } from '@/hooks';
import { Header } from '@/components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import ProductHistory from '../ProductHistory';
import WorkloadEndScreen from '../WorkloadEnd/Index';
import { signatureImagestored } from '@/store/signature';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

interface IProps {
  route: {
    params: RouteParams;
  };
}
interface RouteParams {
  data: {
    id: string;
    name: string;
  };
}
const EndworkloadProductHistory = ({ route }: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signatureImagestored(null));
  }, []);
  const params = route.params.data;
  const { Colors, Gutters, Fonts } = useTheme();
  const styles = getStyles(Colors);
  const tabs = [
    { key: 'second', title: 'End Workload' },
    { key: 'first', title: 'Product History' },
  ];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabs);

  const FirstRoute = () => <WorkloadEndScreen route={route} />;
  const SecondRoute = () => <ProductHistory params={params} />;

  const renderScene = SceneMap({
    second: FirstRoute,
    first: SecondRoute,
  });

  const renderTabBar = (props: any) => {
    return (
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
    );
  };
  return (
    <CustomSafeArea>
      <Header backPage="Dashboard" title="End Workload" notShowIcons={true} />

      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </CustomSafeArea>
  );
};
export default EndworkloadProductHistory;
