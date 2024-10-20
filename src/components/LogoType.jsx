import { useMemo, useState, useRef } from "react";
import ReactVivus from "react-vivus";

const LogoType = ({ fileName }) => {
  const random = useMemo(() => Math.random(), []);

  return (
    <ReactVivus
      id="logo-type"
      className="logo-type"
      option={{
        file: fileName,
        type: random > 0.5 ? "delayed" : "oneByOne",
        start: "inViewport",
        duration: random * 200 + 100,
        animTimingFunction: "EASE",
        pathTimingFunction: "EASE",
        reverseStack: true,
      }}
    />
  );
};

export default LogoType;
