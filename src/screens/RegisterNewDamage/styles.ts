import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';
import { useTheme } from '@/hooks';

const getStyles = () => {
  const { Colors, Gutters } = useTheme();

  return StyleSheet.create({
    textContainer: {
      backgroundColor: Colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: Colors.black,
      width: '90%',
      marginLeft: wp(18),
      bottom: wp(18),
    },
    commentInputText: {
      borderRadius: wp(5),
      borderColor: Colors.grey,
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      padding: wp(10),
      minHeight: wp(100),
    },
    image: {
      width: wp(100),
      height: wp(100),
      borderRadius: 20,
    },
    imageStyle: {
      borderRadius: wp(8),
    },
    uploadImge: {
      marginTop: wp(20),
    },
    modalContainer: {
      ...Gutters.mediumPadding,
      ...Gutters.smallTPadding,
      backgroundColor: Colors.background,
      borderRadius: wp(15),
      gap: 12,
    },
  });
};
export default getStyles;
