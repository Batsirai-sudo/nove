import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Rect width={32} height={32} rx={16} fill="#1DA1F2" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.708 11.438a5.904 5.904 0 01-1.5 1.562v.375c0 2.188-.786 4.172-2.36 5.953C18.277 21.11 16.189 22 13.584 22a8.348 8.348 0 01-4.625-1.375c.334.042.573.063.719.063 1.396 0 2.646-.438 3.75-1.313a3.042 3.042 0 01-1.75-.61 2.863 2.863 0 01-1.063-1.484c.25.042.438.063.563.063.208 0 .48-.042.813-.125a3.055 3.055 0 01-1.735-1.047 2.88 2.88 0 01-.703-1.922v-.031c.458.25.917.375 1.375.375-.896-.584-1.344-1.427-1.344-2.531 0-.521.136-1.021.406-1.5 1.605 1.979 3.678 3.03 6.22 3.156-.042-.146-.063-.375-.063-.688 0-.854.291-1.573.875-2.156.583-.583 1.302-.875 2.156-.875.854 0 1.583.323 2.188.969.625-.104 1.27-.354 1.937-.75-.208.729-.656 1.291-1.344 1.687a5.162 5.162 0 001.75-.469z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgTwitter = React.memo(SvgComponent);
export default SvgTwitter;
