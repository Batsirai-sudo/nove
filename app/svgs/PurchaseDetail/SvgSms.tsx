import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Rect width={32} height={32} rx={16} fill="#44DB5E" />
      <Path
        clipRule="evenodd"
        d="M18.99 9.5h-6.014c-2.183.018-4.04 1.682-4.41 3.95-.37 2.27.854 4.492 2.906 5.277V22.5l3.308-3.488h4.21c2.49 0 4.51-2.13 4.51-4.756 0-2.627-2.02-4.756-4.51-4.756v0z"
        stroke="#fff"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgSms = React.memo(SvgComponent);
export default SvgSms;
