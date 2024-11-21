import { navigate } from './Root';
import { ShiftTimer } from '@/components';
import { wp } from '@/utils/layout-scaling';
import { shiftSelector } from '@/store/shift';
import React, { useEffect, useState } from 'react';
import { myStartedShifts } from '@/store/shift/shiftThunk';
import { logOutAndReset } from '@/store/logOut/logOutAndReset';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clearUserinfo, dashboardSelector } from '@/store/dashboard';
import { externalLinkInfo } from '@/store/externalLink/externalLinkInfo';

import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { externalLinkSelector } from '@/store/externalLink';

const ExternalLinksScreen = () => {
  const { Colors, Layout, Fonts, Gutters, FontSize } = useTheme();

  const styles = getStyles(Colors, Fonts, FontSize);
  const { externalLinkData } = useAppSelector(externalLinkSelector);

  const items: IProps[] = externalLinkData?.Items || [];

  const dispatch = useAppDispatch();
  useEffect(() => {
    const payload = {
      CurrentPage: 1,
      PageSize: 10,
    };
    dispatch(externalLinkInfo(payload));
  }, []);
  interface ISection {
    title: string;
    data: IProps[];
  }
  const SECTIONS: ISection[] = [
    {
      title: 'External Links',
      data: items,
    },
  ];
  const initialExpandedSections = Object.fromEntries(
    SECTIONS.map(({ title }) => [title, { expanded: true }]),
  );
  const [expandedSections, setExpandedSections] = useState(
    initialExpandedSections,
  );

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: {
        ...prev[title],
        expanded: !prev[title]?.expanded,
      },
    }));
  };

  const renderSectionHeader = (section: any) => (
    <TouchableOpacity
      onPress={() => toggleSection(section.title)}
      style={[Layout.row]}
    >
      <MaterialIcons
        name={
          expandedSections[section.title]?.expanded
            ? 'keyboard-arrow-up'
            : 'keyboard-arrow-right'
        }
        size={35}
        color={Colors.black}
      />
      <Text style={[Gutters.tinyTMargin, Fonts.textSmallBold]}>
        {section.title}
      </Text>
    </TouchableOpacity>
  );

  const openLink = (item: string) => {
    navigate('ExternalLinks', { item: item });
  };

  interface IProps {
    CompanyId: number;
    ExternalLink: string;
    GuId: string;
    Id: number;
    Title: string;
  }

  const renderItem = (item: IProps) => {
    return (
      <TouchableOpacity
        style={[Gutters.largeLPadding, Gutters.smallRMargin]}
        onPress={() => openLink(item.ExternalLink)}
      >
        <Text style={[Fonts.textSmall, styles.item]}>{item?.Title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[Gutters.smallLPadding]}>
      <SectionList
        sections={SECTIONS.map(({ title, data }, index) => ({
          title,
          data: expandedSections[title]?.expanded ? data : [],
          index,
        }))}
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={({ item }) => renderItem(item)}
        renderSectionHeader={({ section }) => renderSectionHeader(section)}
      />
    </View>
  );
};

function CustomDrawer(props: any) {
  const { Colors, Layout, Fonts, Gutters, FontSize, Common, Images } =
    useTheme();
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(logOutAndReset());
    dispatch(clearUserinfo());
    navigate('Login');
  };

  const styles = getStyles(Colors, Fonts, FontSize);

  const { scheduleInfo } = useAppSelector(dashboardSelector);
  const isShiftStarted = myStartedShifts !== null;
  const { myStartShiftData: shiftInfo } = useAppSelector(shiftSelector);
  return (
    <View style={[Layout.fill]}>
      <View style={[Gutters.smallMargin]}>
        <View style={[Layout.row]}>
          <Image source={Images.avatar} style={styles.avtar} />
          <View style={[Gutters.regularLMargin]}>
            <Text style={styles.authorText}>{scheduleInfo?.EmployeeName}</Text>
            <Text style={styles.scheduleText}>Scheduled to work at DHL</Text>
            {!isShiftStarted ||
              (shiftInfo == null && (
                <Text style={[Fonts.textSmallBold]}>
                  {scheduleInfo?.StartTime} - {scheduleInfo?.EndTime}
                </Text>
              ))}
          </View>
        </View>
        <View style={styles.ShiftTimer}>
          {isShiftStarted && shiftInfo !== null && (
            <ShiftTimer start={shiftInfo?.StartDateTime} />
          )}
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.appColor }}
      >
        <View
          style={[Gutters.regularLMargin, Layout.fill, Gutters.smallTPadding]}
        >
          <DrawerItemList {...props}></DrawerItemList>
          <ExternalLinksScreen />
        </View>
      </DrawerContentScrollView>
      <View style={[Gutters.regularPadding, styles.signOutWrapper]}>
        <TouchableOpacity style={[Gutters.smallVPadding]} onPress={signOut}>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <FontAwesome5
              name="power-off"
              size={wp(15)}
              color={Colors.primaryTextColor}
              style={[Gutters.tinyRMargin]}
            />
            <Text style={[Fonts.textSmall]}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;

const getStyles = (colors: any, fonts: any, fontSize: any) => {
  return StyleSheet.create({
    shiftToggler: {
      top: -20,
    },
    avtar: {
      width: wp(52),
      height: wp(52),
      borderRadius: wp(52),
    },

    authorText: {
      ...fonts.textSmallBold,
      fontSize: wp(18),
    },

    scheduleText: {
      ...fonts.textTinyBold,
      top: wp(-4),
    },
    ShiftTimer: {
      marginRight: wp(-5),
    },

    sectionTitle: {
      fontSize: fontSize.small,
      color: colors.primaryTextColor,
    },
    item: {
      margin: wp(4),
    },
    signOutWrapper: {
      borderTopWidth: wp(1),
      borderTopColor: colors.primaryTextColor,
    },
  });
};
