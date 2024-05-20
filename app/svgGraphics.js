import React, { Suspense } from "react";
import PropTypes from "prop-types";
import svgConfig from "./assets/svg/svg";
import LoaderSVG from "./assets/svg/Loader.svg";

const ArrowsSVG = React.lazy(svgConfig.arrows);
const SendinblueLogoSVG = React.lazy(svgConfig.sendinblueLogo);

function SvgGraphics(props) {
  const { style, iconType, className } = props;

  const switchFunction = () => {
    switch (iconType) {
      case "loader": {
        return (
          <LoaderSVG
            style={style}
            className={`icon clickable__icon progress-indicator__icon ${className}`}
          />
        );
      }
      case "arrows": {
        return <ArrowsSVG className="icon_standalone connect__icon_arrows" />;
      }

      case "sendinblueLogo": {
        return <SendinblueLogoSVG className="organization__logo" />;
      }

      default:
        return null;
    }
  };

  return <Suspense fallback={<div />}>{switchFunction()}</Suspense>;
}

SvgGraphics.defaultProps = {
  className: "",
  style: {},
};

SvgGraphics.propTypes = {
  iconType: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SvgGraphics;
