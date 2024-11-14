import { StyleSheet } from 'react-native';
import { ThemeVariables } from '../../@types/theme';

export default function ({ FontSize, Colors }: ThemeVariables) {
  const base = {
    ...mediumFontFamily,
    fontSize: FontSize.small,
    color: Colors.black,
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
      ...boldFontFamily,
      color: Colors.black,
      fontSize: FontSize.smallNormal,
    },

    textNormal: {
      ...regularFontFamily,
      color: Colors.black,
      fontSize: FontSize.normal,
    },
    textMedium: {
      ...boldFontFamily,
      color: Colors.black,
      fontSize: FontSize.smallTiny,
      fontWeight: 'bold',
    },
    textMediumLightBlack: {
      ...boldFontFamily,
      color: Colors.lightBlack,
      fontSize: FontSize.smallTiny,
    },
    textMediumBold: {
      ...boldFontFamily,
      color: Colors.black,
      fontSize: FontSize.small,
      fontWeight: 'bold',
    },

    textLarge: {
      ...base,
      fontSize: FontSize.large,
    },
    textLargeBold: {
      ...boldFontFamily,
      color: Colors.black,
      fontSize: FontSize.regular,
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
