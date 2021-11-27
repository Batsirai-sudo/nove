import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent() {
  return (
    <Svg width={48} height={52} viewBox="0 0 48 52" fill="none">
      <G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 5c-7.732 0-14 6.268-14 14 0 6.598 4.565 12.13 10.708 13.61L24 37l3.292-4.39C33.435 31.13 38 25.599 38 19c0-7.732-6.268-14-14-14z"
          fill="#353B48"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.554 11.013A8 8 0 0132 19v.069a5.578 5.578 0 00-2.21-.433h-.08c-.019 0-.037 0-.055.002a5.576 5.576 0 00-.664 2.88 5.672 5.672 0 012.537.197 8.006 8.006 0 01-7.332 5.282c-.065.002-.13.002-.196.002a7.994 7.994 0 01-7.998-7.828C16 19.114 16 19.057 16 18.999a8 8 0 017.554-7.986zM24 13.41a5.589 5.589 0 00-5.583 5.354 10.366 10.366 0 0110.576-2.28A5.595 5.595 0 0024 13.41z"
        fill="#fff"
      />
      <Defs></Defs>
    </Svg>
  );
}

const PinLocation = React.memo(SvgComponent);
export default PinLocation;
