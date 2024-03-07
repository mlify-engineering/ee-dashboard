import React from 'react';
import { Layout, Image, Button } from 'antd';
import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './MenuContent';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusCircleFilled } from '@ant-design/icons';

const { Sider } = Layout;

export const SideNav = ({ navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true }) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };
  let history = useHistory();
  const { user } = useSelector((state) => state.auth);

  return (
    <Sider
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK ? 'side-nav-dark' : ''}`}
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex p-3 ml-3 mr-3 mt-3">
          <Image
            src={user?.profile?.image_url}
            width="70px"
            height="70px"
            className="rounded-circle"
            preview={false}
            placeholder={true}
          />
          {!navCollapsed ? (
            <div className="d-flex flex-column ml-3">
              <p className="mb-0">
                {user?.first_name} {user?.last_name}
              </p>
              <p>{`AW-00000${user?.id}`}</p>
            </div>
          ) : (
            ''
          )}
        </div>
        <Button
          type="primary"
          className="m-3"
          icon={navCollapsed ? <PlusCircleFilled /> : ''}
          onClick={() => {
            history.push(`/app/book_shipment`);
          }}>
          {!navCollapsed ? 'Start New Shipment' : ''}
        </Button>
      </div>
      <Scrollbars autoHide>
        <MenuContent type={NAV_TYPE_SIDE} {...props} />
      </Scrollbars>
    </Sider>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme } = theme;
  return { navCollapsed, sideNavTheme };
};

export default connect(mapStateToProps)(SideNav);
