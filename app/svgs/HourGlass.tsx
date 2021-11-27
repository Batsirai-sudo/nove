import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
      <Path
        d="M4.07 13.91a.5.5 0 100 1v-1zm3.19-1.424l-.292-.406-.008.005-.007.006.306.395zm1.479-.004l.303-.397-.007-.005-.007-.005-.29.408zm3.19 2.428a.5.5 0 100-1v1zM4.892 6.972a.5.5 0 10.365.93l-.365-.93zm6.291.878a.5.5 0 10-.369-.93l.37.93zM4.07 14.91c.351 0 .705-.118 1.022-.268.323-.152.647-.356.95-.57.59-.414 1.19-.932 1.523-1.19l-.612-.791c-.409.317-.912.76-1.486 1.164a5.6 5.6 0 01-.802.483c-.257.121-.455.172-.595.172v1zm3.48-2.017a.778.778 0 01.9-.003l.578-.815a1.778 1.778 0 00-2.06.005l.583.813zm.886-.013c.325.248.943.779 1.522 1.188.303.214.627.42.95.572.316.151.67.27 1.022.27v-1c-.14 0-.337-.05-.593-.173a5.617 5.617 0 01-.802-.485c-.583-.412-1.07-.845-1.493-1.167l-.606.795zm-3.18-4.977c.819-.321 1.56-.15 2.536.057.953.202 2.072.414 3.39-.11l-.369-.93c-1.02.406-1.88.26-2.814.062-.911-.193-1.962-.46-3.108-.01l.365.93z"
        fill="#fff"
      />
      <Path
        d="M11.43 16.093a.5.5 0 001 0h-1zm.5-3.243h-.5.5zm-1.462-2.755l.283-.412-.283.412zM9.11 9.162l.283-.412-.283.412zm0-.393l.283.412-.283-.412zm1.357-.933l-.283-.412.283.412zM11.93 5.08h-.5.5zm.5-3.414a.5.5 0 10-1 0h1zm-7.86 0a.5.5 0 10-1 0h1zm-.5 3.414h.5-.5zm1.463 2.755l.283-.412-.283.412zm1.357.933l-.283.412.283-.412zm0 .393l-.283-.412.283.412zm-1.357.933l.283.412-.283-.412zM4.07 12.85h.5-.5zm-.5 3.243a.5.5 0 001 0h-1zM3 16a.5.5 0 000 1v-1zm10 1a.5.5 0 000-1v1zM3 1a.5.5 0 000 1V1zm10 1a.5.5 0 000-1v1zm-.57 14.093V12.85h-1v3.243h1zm0-3.243a3.846 3.846 0 00-1.679-3.167l-.567.824a2.845 2.845 0 011.246 2.343h1zm-1.68-3.167L9.394 8.75l-.566.824 1.357.934.567-.825zM9.394 8.75a.261.261 0 01.113.216h-1c0 .245.122.472.321.608l.566-.824zm.113.216c0 .089-.045.168-.113.215l-.566-.824a.739.739 0 00-.321.609h1zm-.113.215l1.358-.933-.567-.824-1.357.933.566.824zm1.358-.933A3.845 3.845 0 0012.43 5.08h-1c0 .929-.462 1.804-1.246 2.343l.567.824zM12.43 5.08V1.667h-1V5.08h1zM3.57 1.667V5.08h1V1.667h-1zm0 3.414c0 1.264.63 2.445 1.68 3.167l.566-.824A2.846 2.846 0 014.57 5.08h-1zm1.68 3.167l1.357.933.566-.824-1.357-.933-.567.824zm1.357.933a.261.261 0 01-.113-.215h1a.739.739 0 00-.321-.61l-.566.825zm-.113-.215c0-.09.045-.17.113-.216l.566.824a.739.739 0 00.321-.608h-1zm.113-.216l-1.358.933.567.825 1.357-.934-.566-.824zm-1.358.933A3.845 3.845 0 003.57 12.85h1c0-.929.462-1.804 1.246-2.342l-.567-.825zM3.57 12.85v3.243h1V12.85h-1zM3 17h10v-1H3v1zM3 2h10V1H3v1z"
        fill="#fff"
      />
      <Path
        d="M6.972 9.065c.706.175.987 1.017 1.028 1.017.032 0 .213-.813 1.006-1.13"
        stroke="#fff"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const HourGlass = React.memo(SvgComponent);
export default HourGlass;
