import * as React from 'react';
import Svg, {Path, Mask, G} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 9.95L2.292 12 3 7.658 0 4.584l4.146-.634L6 0l1.854 3.95L12 4.584 9 7.658 9.708 12 6 9.95z"
        fill="#F1F1F1"
      />
      <Mask
        id="prefix__a"
        // @ts-ignore
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={12}
        height={12}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 9.95L2.292 12 3 7.658 0 4.584l4.146-.634L6 0l1.854 3.95L12 4.584 9 7.658 9.708 12 6 9.95z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill="#ED3269" d="M-1 0h7v12h-7z" />
      </G>
    </Svg>
  );
}

const HalfStarRate = React.memo(SvgComponent);
export default HalfStarRate;
