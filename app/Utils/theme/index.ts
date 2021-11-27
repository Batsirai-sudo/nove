import { PixelRatio, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const realWidth = height > width ? width : height;
const realHeight = height > width ? height : width;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const relativeWidth = (num: number) => (realWidth * num) / 100;
const relativeHeight = (num: number) => (realHeight * num) / 100;

const fontBaseXSmall = 12;
const fontBaseSmall = 15;
const fontBaseNormal = 17;
const fontBaseLarge = 20;
const fontBaseXLarge = 24;
const fontBaseXXLarge = 28;

const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  let adjustedWidth = width * pixelDensity;
  let adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

const responsiveFontSize = (fontSize: number) => {
  let divider = isTablet() ? 600 : 375;
  return Math.round((fontSize * realWidth) / divider);
};

const fontXSmall = responsiveFontSize(fontBaseXSmall);
const fontSmall = responsiveFontSize(fontBaseSmall);
const fontNormal = responsiveFontSize(fontBaseNormal);
const fontLarge = responsiveFontSize(fontBaseLarge);
const fontXLarge = responsiveFontSize(fontBaseXLarge);
const fontXXLarge = responsiveFontSize(fontBaseXXLarge);

// eslint-disable-next-line no-shadow
const responsiveHeight = (height: number) => {
  if (!isTablet()) {
    return height;
  } else {
    return height + height * 0.25;
  }
};

export default {
  fontXSmall,
  fontSmall,
  fontNormal,
  fontLarge,
  fontXLarge,
  fontXXLarge,
  responsiveHeight,
  relativeWidth,
  relativeHeight,
  responsiveFontSize,
  APPBAR_HEIGHT,
};


// 
// import {useDarkMode} from 'react-native-dark-mode';

// /**
//  * Define Const color use for whole application
//  */
// export const BaseColor = {
//   grayColor: '#9B9B9B',
//   dividerColor: '#BDBDBD',
//   whiteColor: '#FFFFFF',
//   fieldColor: '#F5F5F5',
//   yellowColor: '#FDC60A',
//   navyBlue: '#3C5A99',
//   kashmir: '#5D6D7E',
//   orangeColor: '#E5634D',
//   blueColor: '#5DADE2',
//   pinkColor: '#A569BD',
//   greenColor: '#58D68D',
//   yellowColor: '#FDC60A',
// };

// /**
//  * Define Const list theme use for whole application
//  */
// export const ThemeSupport = [
//   {
//     theme: 'orange',
//     light: {
//       dark: false,
//       colors: {
//         primary: '#E5634D',
//         primaryDark: '#C31C0D',
//         primaryLight: '#FF8A65',
//         accent: '#4A90A4',
//         background: 'white',
//         card: '#F5F5F5',
//         text: '#212121',
//         border: '#c7c7cc',
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: '#E5634D',
//         primaryDark: '#C31C0D',
//         primaryLight: '#FF8A65',
//         accent: '#4A90A4',
//         background: '#010101',
//         card: '#121212',
//         text: '#e5e5e7',
//         border: '#272729',
//       },
//     },
//   },
//   {
//     theme: 'pink',
//     light: {
//       dark: false,
//       colors: {
//         primary: '#A569BD',
//         primaryDark: '#C2185B',
//         primaryLight: '#F8BBD0',
//         accent: '#8BC34A',
//         background: 'white',
//         card: '#F5F5F5',
//         text: '#212121',
//         border: '#c7c7cc',
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: '#A569BD',
//         primaryDark: '#C2185B',
//         primaryLight: '#F8BBD0',
//         accent: '#8BC34A',
//         background: '#010101',
//         card: '#121212',
//         text: '#e5e5e7',
//         border: '#272729',
//       },
//     },
//   },
//   {
//     theme: 'blue',
//     light: {
//       dark: false,
//       colors: {
//         primary: '#5DADE2',
//         primaryDark: '#1281ac',
//         primaryLight: '#68c9ef',
//         accent: '#FF8A65',
//         background: 'white',
//         card: '#F5F5F5',
//         text: '#212121',
//         border: '#c7c7cc',
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: '#5DADE2',
//         primaryDark: '#1281ac',
//         primaryLight: '#68c9ef',
//         accent: '#FF8A65',
//         background: '#010101',
//         card: '#121212',
//         text: '#e5e5e7',
//         border: '#272729',
//       },
//     },
//   },
//   {
//     theme: 'green',
//     light: {
//       dark: false,
//       colors: {
//         primary: '#58D68D',
//         primaryDark: '#388E3C',
//         primaryLight: '#C8E6C9',
//         accent: '#607D8B',
//         background: 'white',
//         card: '#F5F5F5',
//         text: '#212121',
//         border: '#c7c7cc',
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: '#58D68D',
//         primaryDark: '#388E3C',
//         primaryLight: '#C8E6C9',
//         accent: '#607D8B',
//         background: '#010101',
//         card: '#121212',
//         text: '#e5e5e7',
//         border: '#272729',
//       },
//     },
//   },
//   {
//     theme: 'yellow',
//     light: {
//       dark: false,
//       colors: {
//         primary: '#FDC60A',
//         primaryDark: '#FFA000',
//         primaryLight: '#FFECB3',
//         accent: '#795548',
//         background: 'white',
//         card: '#F5F5F5',
//         text: '#212121',
//         border: '#c7c7cc',
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: '#FDC60A',
//         primaryDark: '#FFA000',
//         primaryLight: '#FFECB3',
//         accent: '#795548',
//         background: '#010101',
//         card: '#121212',
//         text: '#e5e5e7',
//         border: '#272729',
//       },
//     },
//   },
// ];

// /**
//  * Define default theme use for whole application
//  */
// export const DefaultTheme = {
//   theme: 'orange',
//   light: {
//     dark: false,
//     colors: {
//       primary: '#E5634D',
//       primaryDark: '#C31C0D',
//       primaryLight: '#FF8A65',
//       accent: '#4A90A4',
//       background: 'white',
//       card: '#F5F5F5',
//       text: '#212121',
//       border: '#c7c7cc',
//     },
//   },
//   dark: {
//     dark: true,
//     colors: {
//       primary: '#E5634D',
//       primaryDark: '#C31C0D',
//       primaryLight: '#FF8A65',
//       accent: '#4A90A4',
//       background: '#010101',
//       card: '#121212',
//       text: '#e5e5e7',
//       border: '#272729',
//     },
//   },
// };

// /**
//  * Define list font use for whole application
//  */
// export const FontSupport = ['Raleway', 'Montserrat'];

// /**
//  * Define font default use for whole application
//  */
// export const DefaultFont = 'Montserrat';

// /**
//  * export theme and colors for application
//  * @returns theme,colors
//  */
// export const useTheme = () => {
//   const isDarkMode = useDarkMode();
//   const forceDark = useSelector((state) => state.application.force_dark);
//   const themeStorage = useSelector((state) => state.application.theme);
//   const listTheme = ThemeSupport.filter((item) => item.theme == themeStorage);
//   const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;

//   if (forceDark) {
//     return {theme: theme.dark, colors: theme.dark.colors};
//   }
//   if (forceDark == false) {
//     return {theme: theme.light, colors: theme.light.colors};
//   }
//   return isDarkMode
//     ? {theme: theme.dark, colors: theme.dark.colors}
//     : {theme: theme.light, colors: theme.light.colors};
// };

// /**
//  * export font for application
//  * @returns font
//  */
// export const useFont = () => {
//   const font = useSelector((state) => state.application.font);
//   return font ?? DefaultFont;
// };
