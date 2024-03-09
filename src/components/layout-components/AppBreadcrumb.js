import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import navigationConfig from "configs/NavigationConfig";
import IntlMessage from "components/util-components/IntlMessage";

let breadcrumbData = {
  "/": <IntlMessage id="home" />,
};

navigationConfig.forEach((elm) => {
  const assignBreadcrumb = (obj) =>
    (breadcrumbData[obj.path] = <IntlMessage id={obj.title} />);
  assignBreadcrumb(elm);
  if (elm.submenu) {
    elm.submenu.forEach((elm) => {
      assignBreadcrumb(elm);
      if (elm.submenu) {
        elm.submenu.forEach((elm) => {
          assignBreadcrumb(elm);
        });
      }
    });
  }
});

// Refactored to use the useLocation hook directly
const BreadcrumbRoute = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const buildBreadcrumb = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbData[url] ? breadcrumbData[url] : url}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{buildBreadcrumb}</Breadcrumb>;
};

export class AppBreadcrumb extends Component {
  render() {
    return <BreadcrumbRoute />;
  }
}

export default AppBreadcrumb;
