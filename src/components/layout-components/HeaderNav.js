import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Logo from "./Logo";
import {
  toggleCollapsedNav,
  onMobileNavToggle,
} from "../../redux/actions/Theme";
import utils from "utils";

const { Header } = Layout;

export const HeaderNav = (props) => {
  const { logoType, headerNavColor, currentTheme } = props;

  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff",
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();

  useEffect(() => {});

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className="app-header--pane">
        <Logo logoType={logoType} />
      </div>
      <img
        className="show-mobile"
        src={`${process.env.PUBLIC_URL}/img/MLifyLogo.png`}
        alt="Canada Logo"
        style={{ height: "30px", width: "30px", margin: "20px" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center",
          flexGrow: 1,
        }}
      >
        <h1 className="hide-mobile">
          Express Entry Visualizer - Overview of Canada&apos;s Immigration
          Rounds
        </h1>
        <h4 className="show-mobile">
          Express Entry Visualizer <br />
          Overview of Canada&apos;s Immigration
        </h4>
      </div>
      <img
        className="hide-mobile"
        src={`${process.env.PUBLIC_URL}/img/mapple-leaf.png`}
        alt="Canada Logo"
        style={{ margin: "20px", height: "50px" }}
      />
      <img
        className="show-mobile"
        src={`${process.env.PUBLIC_URL}/img/mapple-leaf.png`}
        alt="Canada Logo"
        style={{ margin: "20px", height: "30px" }}
      />
    </Header>
  );
};

const mapStateToProps = ({ theme }) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  } = theme;
  return {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle,
})(HeaderNav);
