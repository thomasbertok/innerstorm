import { useMemo } from "react";
import ReactVivus from "react-vivus";
const filePath = `${import.meta.env.VITE_PUBLIC_URL}/assets/logo-type.svg`;

const LogoType = () => {
  const random = useMemo(() => Math.random(), []);

  return (
    <ReactVivus
      id="logo-type"
      className="logo-type"
      option={{
        file: filePath,
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
