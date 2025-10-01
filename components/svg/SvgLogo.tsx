import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

export default function SvgLogo({ width = 35, height = 35 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 38 43" fill="none">
      <Path
        d="M0 0.000732422V42.7224H37.4543V0.000732422H0ZM37.1273 42.3943H0.327035V0.327775H37.1273V42.3943Z"
        fill="white"
      />
      <Path
        d="M6.35376 16.7547V5.24438H31.1004V15.2002L27.6127 10.8803H11.9897V13.5134L19.0737 21.2023L18.6212 21.8497L6.35376 16.7547Z"
        fill="white"
      />
      <Path
        d="M6.35376 16.7547V5.24438H31.1004V15.2002L27.6127 10.8803H11.9897V13.5134L19.0737 21.2023L18.6212 21.8497L6.35376 16.7547Z"
        fill="white"
      />
      <Path
        d="M6.35376 37.4784V27.1485L10.2324 31.8414H25.4645V27.0544L18.5697 19.1483L19.048 18.5166L31.1004 24.2085V37.4784H6.35376Z"
        fill="white"
      />
    </Svg>
  );
}
