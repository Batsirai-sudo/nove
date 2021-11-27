import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
}

function SvgComponent(props:Props) {
  const color = props.color;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 15.102V7.807c0-1.16.523-1.932 1.568-2.318 1.046-.387 2.523-.58 4.432-.58 1.91 0 3.386.193 4.432.58C17.477 5.875 18 6.648 18 7.807v7.295c0 .705-.244 1.302-.733 1.79-.489.489-1.096.733-1.824.733l.92.92v.546H7.637v-.546l.92-.92c-.726 0-1.334-.244-1.823-.733A2.435 2.435 0 016 15.102zm6 .989c.364 0 .682-.136.954-.41.273-.272.41-.59.41-.954 0-.363-.137-.681-.41-.954a1.308 1.308 0 00-.954-.41c-.364 0-.682.137-.954.41-.273.273-.41.59-.41.954s.137.682.41.955c.272.273.59.409.954.409zm4.364-5.182V7.636H7.636v3.273h8.728z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgTrain = React.memo(SvgComponent);
export default SvgTrain;
