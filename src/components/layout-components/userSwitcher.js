import React, { useState } from "react";
import { Menu, Dropdown, Avatar, List, Button } from "antd";
import {
  MailOutlined,
  UserSwitchOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
// import accessListData from "assets/data/accesslist.data.json";
import Flex from "components/shared-components/Flex";
import { useSelector, useDispatch } from "react-redux";
import { updateLoggedInAs } from "redux/actions/Auth";

const getIcon = (icon) => {
  switch (icon) {
    case "mail":
      return <MailOutlined />;
    case "alert":
      return <WarningOutlined />;
    case "check":
      return <CheckCircleOutlined />;
    default:
      return <MailOutlined />;
  }
};

const NavUserElement = (props) => {
  const { user } = props;

  const onSwitch = (e) => {
    if (typeof props.onSwitch === "function") {
      props.onSwitch(e);
    }
  };

  return (
    <>
      <List.Item className="list-clickable">
        <Flex alignItems="center">
          <div className="pr-3">
            {user?.img ? (
              <Avatar src={`/img/avatars/${user?.img}`} />
            ) : (
              <Avatar
                className={`ant-avatar-${user?.type}`}
                icon={getIcon(user?.icon)}
              />
            )}
          </div>
          <div className="mr-3">
            <div className="font-weight-bold text-dark">{user.name}</div>
            <div className="text-gray-light">
              {user?.desc || "Default Account"}
            </div>
          </div>
        </Flex>
        <Button
          className="float-right"
          type="link"
          onClick={() => onSwitch(user)}
          size="small"
        >
          Access
        </Button>
      </List.Item>
    </>
  );
};

export const NavUserSwitcher = () => {
  const [visible, setVisible] = useState(false);
  // const [data, setData] = useState(accessListData);
  const { user, accessList, loggedInAs } = useSelector((state) => state.auth);
  // const { user, accessList, loggedInAs } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUserSwitcherBody = (list) => {
    return list && list.length > 0 ? (
      <>
        <div className="border-bottom">
          <NavUserElement user={user} onSwitch={handleSwitch} />
        </div>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) =>
            item && (
              <List.Item className="list-clickable">
                <Flex alignItems="center">
                  <div className="pr-3">
                    {item?.img ? (
                      <Avatar src={`/img/avatars/${item?.img}`} />
                    ) : (
                      <Avatar
                        className={`ant-avatar-${item?.type}`}
                        icon={getIcon(item?.icon)}
                      />
                    )}
                  </div>
                  <div className="mr-3">
                    <div className="font-weight-bold text-dark">
                      <div className="">
                        {item?.user.first_name}
                        {` `}
                        {item?.user.last_name}
                      </div>
                      {item?.name}
                    </div>
                    <div className="text-gray-light">{item?.desc}</div>
                  </div>
                </Flex>
                <Button
                  className="float-right"
                  id={`user-switch-${item?.desc}-${item?.name}-${item?.user.first_name}-${item?.user.last_name}`}
                  type="link"
                  onClick={() => handleSwitch(item)}
                  size="small"
                >
                  Access
                </Button>
              </List.Item>
            )
          }
        />
      </>
    ) : (
      <div className="empty-notification">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="empty"
        />
        <p className="mt-3">You have no additional access</p>
      </div>
    );
  };

  const handleVisibleChange = (flag) => {
    if (accessList.length > 0) setVisible(flag);
  };

  const handleSwitch = (item) => {
    dispatch(updateLoggedInAs(item));
    window.location.reload(); // Add this line to reload the page after switching user
  };

  const notificationList = (
    <div className="nav-dropdown nav-notification">
      <div className="nav-notification-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Switch Accounts</h4>
      </div>
      <div className="nav-notification-body">
        {getUserSwitcherBody(accessList)}
      </div>
    </div>
  );

  return (
    loggedInAs && (
      <Dropdown
        placement="bottomRight"
        overlay={notificationList}
        onVisibleChange={handleVisibleChange}
        visible={visible}
        trigger={["click"]}
      >
        <Menu mode="horizontal">
          <Menu.Item>
            <Flex alignItems="center">
              <div className="m-2 mr-3">
                <div
                  className="font-weight-bold text-dark text-right"
                  style={{ lineHeight: "24px" }}
                >
                  {loggedInAs?.name}{" "}
                </div>
                <div
                  className="text-gray-light lh-1 text-right"
                  style={{ lineHeight: "24px" }}
                >
                  {loggedInAs?.desc}
                </div>
              </div>
              <UserSwitchOutlined className="nav-icon mx-auto" />
            </Flex>
          </Menu.Item>
        </Menu>
      </Dropdown>
    )
  );
};

export default NavUserSwitcher;
