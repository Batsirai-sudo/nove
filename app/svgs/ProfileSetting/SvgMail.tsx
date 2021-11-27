import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M1.695 5.281a1 1 0 10-1.39 1.438l1.39-1.438zM16 20.5l-.695.719a1 1 0 001.39 0L16 20.5zM31.695 6.719a1 1 0 00-1.39-1.438l1.39 1.438zm-9.98 8.38a1 1 0 00-1.43 1.401l1.43-1.4zm8.57 11.601a1 1 0 001.43-1.4l-1.43 1.4zm-30-1.4a1 1 0 001.43 1.4l-1.43-1.4zm11.43-8.8a1 1 0 00-1.43-1.4l1.43 1.4zM.304 6.72l15 14.5 1.39-1.438-15-14.5-1.39 1.438zm16.39 14.5l15-14.5-1.39-1.438-15 14.5 1.39 1.438zm3.59-4.719l10 10.2 1.43-1.4-10-10.2-1.43 1.4zM1.716 26.7l10-10.2-1.43-1.4-10 10.2 1.43 1.4z"
        fill="#353B48"
      />
      <Path
        clipRule="evenodd"
        d="M1 6h30v20H1V6z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgMail = React.memo(SvgComponent);
export default SvgMail;
