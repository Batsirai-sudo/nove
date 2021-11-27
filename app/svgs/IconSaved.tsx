import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.5 1C21.092 1 24 3.937 24 7.556c0 5.052-3.922 10.077-11.431 15.267l-.569.393-.569-.393C3.922 17.633 0 12.608 0 7.556 0 3.937 2.908 1 6.5 1c2.137 0 4.223 1.055 5.5 2.68C13.277 2.055 15.363 1 17.5 1z"
        fill="#ED3269"
      />
    </Svg>
  );
}

const SvgSaved = React.memo(SvgComponent);
export default SvgSaved;
