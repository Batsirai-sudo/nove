import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" >
      <Path
        clipRule="evenodd"
        d="M17.5 2c-2.383 0-4.73 1.556-5.5 3.704C11.23 3.556 8.883 2 6.5 2 3.462 2 1 4.487 1 7.556 1 12.37 5.033 17.186 12 22c6.967-4.815 11-9.63 11-14.444C23 4.487 20.538 2 17.5 2z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

const IconUnSave = React.memo(SvgComponent);
export default IconUnSave;
