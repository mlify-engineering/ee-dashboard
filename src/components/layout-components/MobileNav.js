import React from "react";
import { Drawer, Button } from "antd";
import { connect } from "react-redux";
import { onMobileNavToggle } from "../../redux/actions/Theme";
import Logo from "./Logo";
import Flex from "components/shared-components/Flex";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const MobileNav = ({
  sideNavTheme,
  mobileNav,
  onMobileNavToggle,
  routeInfo,
  hideGroupTitle,
  localization = true,
}) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };
  let history = useNavigate();
  const onClose = () => {
    onMobileNavToggle(false);
  };

  return (
    <Drawer placement="left" closable={false} onClose={onClose} visible={mobileNav} bodyStyle={{ padding: 5 }}>
      <Flex flexDirection="column" className="h-100">
        <Flex justifyContent="between" alignItems="center">
          <Logo mobileLogo={true} />
          <div className="nav-close" onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </Flex>
      </Flex>
    </Drawer>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme, mobileNav } = theme;
  return { navCollapsed, sideNavTheme, mobileNav };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MobileNav);
