import { Typography, FontWeight, FontFamily } from './typography';
// import {BaseSetting} from './setting';
import { Images } from './images';
import Colors from './colors';
import ROUTES from './routes';
import ErrorMessages from './errorMessages';
import { themeLight, themeDark } from './shopTheme';
// import {BaseStyle} from './styles';
import currencyFormatter from './currencyFormatter';
import { listStatus } from './orderStatus';
import { batchTable,InvoiceTable } from './table';
import registrationRequest from './registrationRequest';
import shops from './shopList';
import setupOnesignal from './setupOneSignal';
import * as configLink from './urlLinks';
import deepLinkConfig from './deepLinks';
import uniqueid, { keyGenerator } from './uniqueid';
import permissions from './permissions';
import isAdmin from './isAdmin';
import { splitting } from './purifyStrings';
import handleSearch from './search';
import GenerateProfit, { checkWhichWeek } from './generateProfit'
import determineWhichNumber from './isIntFloat'
import { resetToHome } from './resetingRoutes';
import { recordSellsForCash } from './pointOfSell';
import { LoopThroughMonths } from './weeks'
import {
  BaseColor,
  useTheme,
  useFont,
  FontSupport,
  ThemeSupport,
  DefaultFont,
} from './theme';

export {
  // BaseColor,
  Typography,
  FontWeight,
  FontFamily,
  // BaseSetting,
  Images,
  Colors,
  ROUTES,
  ErrorMessages,
  // BaseStyle,
  useTheme,
  useFont,
  FontSupport,
  DefaultFont,
  ThemeSupport,
  themeLight,
  themeDark,
  currencyFormatter,
  listStatus,
  batchTable,
  InvoiceTable,
  registrationRequest,
  shops,
  configLink,
  setupOnesignal,
  deepLinkConfig,
  uniqueid,
  permissions,
  isAdmin,
  keyGenerator,
  splitting,
  GenerateProfit,
  checkWhichWeek,
  handleSearch,
  determineWhichNumber,
  resetToHome,
  recordSellsForCash,
  LoopThroughMonths
};
