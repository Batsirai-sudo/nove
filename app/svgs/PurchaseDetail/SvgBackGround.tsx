import * as React from "react"
import Svg, {
  G,
  Path,
  Mask,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
import {Text, View} from "react-native";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export interface SvgProps {
  children: any,
}

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={327} height={615} viewBox="0 0 327 615" fill="none" >
      <G >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M327 595.674V308.069c-3.314 0-6-2.684-6-5.995a5.996 5.996 0 016-5.994V11.99c-6.627 0-12-5.369-12-11.99H12c0 6.621-5.373 11.99-12 11.99v284.09c3.314 0 6 2.683 6 5.994a5.997 5.997 0 01-6 5.995v294.942c6.627 0 12 5.368 12 11.989h303c0-6.621 5.373-11.989 12-11.989v-7.337z"
          fill="#fff"
        />
      </G>
      <Mask
        id="prefix__a"
        // @ts-ignore
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={327}
        height={615}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M327 595.674V308.069c-3.314 0-6-2.684-6-5.995a5.996 5.996 0 016-5.994V11.99c-6.627 0-12-5.369-12-11.99H12c0 6.621-5.373 11.99-12 11.99v284.09c3.314 0 6 2.683 6 5.994a5.997 5.997 0 01-6 5.995v294.942c6.627 0 12 5.368 12 11.989h303c0-6.621 5.373-11.989 12-11.989v-7.337z"
          fill="#fff"
        />
        {props.children}
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill="#F7F8FA" d="M0 302h327v-70H0z" />
        <Path
          d="M5 302h321"
          stroke="url(#prefix__paint0_linear)"
          strokeLinecap="square"
          strokeDasharray={4}
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={326}
          y1={301}
          x2={5}
          y2={301}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ED3269" />
          <Stop offset={1} stopColor="#F05F3E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const SvgBackground = React.memo(SvgComponent)
export default SvgBackground
