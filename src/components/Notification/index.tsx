import React from 'react';
import moment from 'moment';
import { useTheme } from '@/hooks';
import { hp, wp } from '@/utils/layout-scaling';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  item: {
    type: string;
    text: string;
    date: string;
  };
}
enum NotificationImage {
  Reminder = 'Reminder',
  Completed = 'Completed',
  Incompleted = 'Incompleted',
  Missed = 'Missed',
}

const InAppNotification = ({ item }: IProps) => {
  const notiificationImages = (notificationType: string) => {
    switch (notificationType) {
      case NotificationImage.Reminder: {
        return Images.timer;
      }
      case NotificationImage.Completed: {
        return Images.completed;
      }
      case NotificationImage.Incompleted: {
        return Images.inCompleted;
      }
      case NotificationImage.Missed: {
        return Images.missing;
      }
    }
  };
  const { Colors, Layout, Gutters, Images, FontSize, Common } = useTheme();
  const styles = getStyles(FontSize, Colors);
  return (
    <View style={[Layout.row, Gutters.mediumBMargin]}>
      <Image
        source={notiificationImages(item.type)}
        style={[styles.notificationImage]}
      />
      <View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            styles.textContainer,
          ]}
        >
          <Text style={[styles.textSmall]}>{item.type}</Text>
          <View>
            {/* <Text style={[styles.textDate]}>{moment(item.date).fromNow()}</Text> */}
          </View>
        </View>
        <Text style={[styles.textMedium, Common.lineHeightAndSpacing]}>
          {item.text}
        </Text>

        {item.type === NotificationImage.Completed && (
          <TouchableOpacity>
            <Text style={[[styles.link]]}>viewSummer</Text>
          </TouchableOpacity>
        )}
        {item.type === NotificationImage.Incompleted && (
          <TouchableOpacity>
            <Text style={[[styles.link]]}>goToCheckIn</Text>
          </TouchableOpacity>
        )}
        {item.type === NotificationImage.Missed && (
          <TouchableOpacity>
            <Text style={[[styles.link]]}>makeAnotherSchedule</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getStyles = (FontSize: any, Colors: any) =>
  StyleSheet.create({
    textSmall: {
      fontSize: FontSize.normal,
      color: Colors.black,
    },
    textDate: {
      fontSize: FontSize.tiny,
      color: Colors.lightBlack,
    },
    notificationImage: {
      height: hp(30),
      width: wp(30),
      marginRight: wp(10),
    },
    textContainer: {
      width: '93%',
    },
    textMedium: {
      width: wp(200),
      maxWidth: '68%',
      color: Colors.black,
    },
    link: {
      color: Colors.perano,
    },
  });

export default InAppNotification;
