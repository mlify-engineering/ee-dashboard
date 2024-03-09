import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import useBodyClass from "hooks/useBodyClass";
import AppLayout from "layouts/app-layout";
import AppLocale from "../lang";

// Modified component to use hooks
const Views = (props) => {
  const { locale, direction } = props;
  const location = useLocation();
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Routes>
          <Route
            path="/"
            element={<AppLayout direction={direction} location={location} />}
          />
        </Routes>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme }) => {
  const { locale, direction } = theme;
  return { locale, direction };
};

export default connect(mapStateToProps)(Views);
