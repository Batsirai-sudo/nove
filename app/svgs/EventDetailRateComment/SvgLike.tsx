import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.5 3.5a3 3 0 013 3c0 2.296-1.792 4.569-5.218 6.913L8 13.606l-.282-.193C4.292 11.069 2.5 8.796 2.5 6.5a3 3 0 013-3c.965 0 1.908.463 2.5 1.18a3.301 3.301 0 012.5-1.18z"
        fill="#ED3269"
      />
    </Svg>
  );
}

const SvgLike = React.memo(SvgComponent);
export default SvgLike;
