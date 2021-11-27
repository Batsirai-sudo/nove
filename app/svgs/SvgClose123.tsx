import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        d="M13.04 2.375A1 1 0 0011.627.96l1.415 1.414zM.96 11.626a1 1 0 001.414 1.415L.96 11.625zm10.666 1.414a1 1 0 101.415-1.414l-1.415 1.414zM2.374.96A1 1 0 00.96 2.374L2.374.96zm9.252 0L.96 11.627l1.414 1.415L13.04 2.374 11.627.96zm1.415 10.666L2.373.96.96 2.374 11.626 13.04l1.415-1.414z"
        fill="#ED3269"
      />
    </Svg>
  );
}

const SvgClose = React.memo(SvgComponent);
export default SvgClose;
