import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Grid } from 'antd';
import IntlMessage from '../util-components/IntlMessage';
import Icon from '../util-components/Icon';
// import navigationConfig from "configs/NavigationConfig";
import customBrokerConfig from 'configs/CustomBrokerNavigationConfig';
import shipperConfig from 'configs/ShipperNavigationConfig';
import consolidatorConfig from 'configs/ConsolidatorNavigationConfig';
import deconsolidatorConfig from 'configs/DeConsolidatorNavigationConfig';
import { connect } from 'react-redux';
import { SIDE_NAV_LIGHT } from 'constants/ThemeConstant';
import utils from 'utils';
import { onMobileNavToggle } from 'redux/actions/Theme';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn, localeKey) => (isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString());

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = '';
  if (key) {
    const arr = key.split('-');
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
  const {
    sideNavTheme,
    routeInfo,
    // hideGroupTitle,
    localization,
    onMobileNavToggle,
  } = props;
  const { loggedInAs } = useSelector((state) => state.auth);
  // const { user, accessList, loggedInAs } = useSelector((state) => state.auth);
  let navigationConfig;
  switch (loggedInAs?.type) {
    case 'SHIPPER':
      navigationConfig = shipperConfig;
      break;
    case 'CUSTOM_BROKER':
      navigationConfig = customBrokerConfig;
      break;
    case 'CONSOLIDATOR':
      navigationConfig = consolidatorConfig;
      break;
    case 'DECONSOLIDATOR':
      navigationConfig = deconsolidatorConfig;
      break;
    default:
      navigationConfig = shipperConfig;
      break;
  }

  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };
  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? 'light' : 'dark'}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className="hide-group-title">
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <Menu.ItemGroup
            key={menu.key}
            // title={setLocale(localization, menu.title)}
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  icon={subMenuFirst.icon ? <Icon type={subMenuFirst?.icon} /> : null}
                  key={subMenuFirst.key}
                  title={setLocale(localization, subMenuFirst.title)}>
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      {subMenuSecond.icon ? <Icon type={subMenuSecond?.icon} /> : null}
                      <span>{setLocale(localization, subMenuSecond.title)}</span>
                      <Link onClick={() => closeMobileNav()} to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
                  <span id={`left-menu-${subMenuFirst.title}`}>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link onClick={() => closeMobileNav()} to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const MenuContent = (props) => {
  return <SideNavContent {...props} />;
};

const mapStateToProps = ({ theme }) => {
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
