import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={28} height={32} viewBox="0 0 28 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0C6.268 0 0 6.268 0 14c0 6.598 4.564 12.13 10.708 13.61L14 32l3.292-4.39C23.435 26.13 28 20.599 28 14c0-7.732-6.268-14-14-14z"
        fill="#ED3269"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.554 6.013A8 8 0 0122 14v.069a5.578 5.578 0 00-2.21-.434h-.08l-.055.003a5.576 5.576 0 00-.664 2.88 5.672 5.672 0 012.537.197 8.006 8.006 0 01-7.332 5.282c-.065.002-.13.002-.196.002a7.994 7.994 0 01-7.998-7.828C6 14.114 6 14.057 6 13.999a8 8 0 017.554-7.986zM14 8.41a5.588 5.588 0 00-5.583 5.354 10.366 10.366 0 0110.576-2.28A5.595 5.595 0 0014 8.41z"
        fill="#fff"
      />
    </Svg>
  );
}

const PinCurrentEvent = React.memo(SvgComponent);
export default PinCurrentEvent;
