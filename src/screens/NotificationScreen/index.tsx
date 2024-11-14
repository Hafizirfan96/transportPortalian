import React from 'react';
import moment from 'moment';
import { useAppSelector, useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import { View, Text, StyleSheet } from 'react-native';
import { Header, InAppNotification } from '@/components';
import { useSelector } from 'react-redux';

interface INotificationItem {
  type: string;
  text: string;
  date: string;
}

interface IGroupedNotifications {
  [date: string]: INotificationItem[];
}
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
function NotificationScreen({ route }: IProps) {
  const { Colors, Gutters } = useTheme();
  const styles = getStyles(Colors);
  // const data = route.params;
  const appState = useSelector(
    (state: any) => state?.appState.notificationMessage,
  );
  const title = appState?.title || 'No Title';
  const body = appState?.body || 'No Body';

  // console.log('appSta------', title);

  const sampleNotifications = [
    {
      type: title,
      text: body,
      date: '2023-06-13T08:00:00Z',
    },
    // {
    //   type: 'Reminder',
    //   text: 'Don’t miss out! Online appointment with Dr. John Doe today at 01.00 pm',
    //   date: '2023-06-11T15:00:00Z',
    // },
    // {
    //   type: 'Incompleted',
    //   text: "You haven't done the Morning Check In Session yet.",
    //   date: '2023-06-11T15:00:00Z',
    // },
    // {
    //   type: 'Completed',
    //   text: 'Checked! Your Morning Check In Session has been successfull.',
    //   date: '2023-06-10T12:00:00Z',
    // },
    // {
    //   type: 'Missed',
    //   text: 'You missed a scheduled task.',
    //   date: '2023-06-13T18:00:00Z',
    // },
  ];

  const groupedNotifications: IGroupedNotifications =
    sampleNotifications?.reduce(
      (groups: IGroupedNotifications, item: INotificationItem) => {
        const date = moment(item.date).format('YYYY-MM-DD');
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      },
      {} as IGroupedNotifications,
    );

  const renderNotifications = () => {
    return Object.keys(groupedNotifications).map(date => (
      <View key={date}>
        <Text style={[styles.dateHeader, Gutters.smallVMargin]}>
          {/* {moment(date).format('MMMM DD, YYYY')}{' '} */}
        </Text>
        {groupedNotifications[date].map((item, index) => (
          <InAppNotification key={index} item={item} />
        ))}
      </View>
    ));
  };

  return (
    <View>
      <Header backPage="Dashboard" title={'Notification'} />
      <View>{renderNotifications()}</View>
    </View>
  );
}

const getStyles = (Colors: any) =>
  StyleSheet.create({
    dateHeader: {
      fontSize: wp(15),
      color: Colors.black,
    },
  });

export default NotificationScreen;
