import React from "react";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
} from "constants/ThemeConstant";
import { APP_NAME } from "configs/AppConfig";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import utils from "utils";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

const getLogo = (props) => {
  const { navCollapsed, logoType } = props;
  if (logoType === "light") {
    if (navCollapsed) {
      return `${process.env.PUBLIC_URL}` + `/img/MLifyLogo.png`;
    }
    return `${process.env.PUBLIC_URL}` + `/img/MLifyLogo.png`;
  }

  if (navCollapsed) {
    return "/img/logo.png";
  }
  return "/img/logo.png";
};

const getLogoDisplay = (isMobile, mobileLogo) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo";
  }
};

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{ width: `${getLogoWidthGutter(props, isMobile)}` }}
    >
      <Link to="/">
        <img
          className="rectangular-logo"
          src={getLogo(props)}
          alt={`${APP_NAME} logo`}
          width="50px"
        />
      </Link>
    </div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType, logoType } = theme;
  return { navCollapsed, navType, logoType };
};

export default connect(mapStateToProps)(Logo);
