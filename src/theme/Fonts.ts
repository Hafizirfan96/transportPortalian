import { StyleSheet } from 'react-native';
import { ThemeVariables } from '../../@types/theme';
import { wp } from '../utils/layout-scaling';

export default function ({ FontSize, Colors }: ThemeVariables) {
  const base = {
    ...mediumFontFamily,
    fontSize: FontSize.small,
    color: Colors.primaryTextColor,
  };

  const baseBold: any = {
    ...base,
    ...boldFontFamily,
  };

  return StyleSheet.create({
    textTiny: {
      ...base,
      fontSize: FontSize.tiny,
    },
    textTinyBold: {
      ...baseBold,
      fontSize: FontSize.tiny,
    },
    textSmall: {
      ...base,
    },
    textSmallBold: {
      ...baseBold,
    },
    textRegular: {
      ...base,
      fontSize: FontSize.regular,
    },
    textRegularBold: {
      ...baseBold,
      fontSize: FontSize.regular,
      lineHeight: FontSize.regular * 1.5,
    },
    textNormalBold: {
      ...baseBold,
      fontSize: FontSize.normal,
    },

    textNormal: {
      ...base,
      fontSize: FontSize.normal,
    },
    textMedium: {
      ...base,
      fontSize: FontSize.medium,
    },
    textMediumBold: {
      ...baseBold,
      fontSize: FontSize.medium,
    },

    textLarge: {
      ...base,
      fontSize: FontSize.large,
    },
    textLargeBold: {
      ...baseBold,
      fontSize: FontSize.large,
    },
    regularFamily: {
      ...regularFontFamily,
    },

    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },

    boldFontWeight: {
      fontWeight: 'bold',
    },

    textDecorationUnderline: {
      textDecorationLine: 'underline',
    },

    uppercase: {
      textTransform: 'uppercase',
    },

    //obselete - check these classes if dont need then remove them

    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    mediumFontFamily: {
      ...mediumFontFamily,
      color: Colors.text,
    },

    alternativeTextRegular: {
      fontFamily: 'Roboto-Regular',
    },
    boldFontFamily: {
      ...boldFontFamily,
    },

    regularFontFamily: {
      ...regularFontFamily,
    },
  });
}

export const boldFontFamily = {
  fontFamily: 'OsloSans-Bold',
};
export const regularFontFamily = {
  fontFamily: 'OsloSans-Regular',
};
export const mediumFontFamily = {
  fontFamily: 'OsloSans-Medium',
};

export const baseText = {
  ...regularFontFamily,
};
