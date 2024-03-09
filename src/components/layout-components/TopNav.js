import React from "react";
import { connect } from "react-redux";
import utils from "utils";

export const TopNav = ({ topNavColor, localization = true }) => {
  return (
    <div
      className={`top-nav ${utils.getColorContrast(topNavColor)}`}
      style={{ backgroundColor: topNavColor }}
    ></div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { topNavColor } = theme;
  return { topNavColor };
};

export default connect(mapStateToProps)(TopNav);
