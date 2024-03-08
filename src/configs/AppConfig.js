import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
  DIR_LTR,
} from "../constants/ThemeConstant";

import { env } from "./EnvironmentConfig";

export const APP_NAME = "Express Entry Dashboard";
export const DATA_CRS_ENDPOINT_URL = env.DATA_CRS_ENDPOINT_URL;
export const DATA_POOL_ENDPOINT_URL = env.DATA_POOL_ENDPOINT_URL;
export const DATA_INVITATION_ENDPOINT_URL = env.DATA_INVITATION_ENDPOINT_URL;
export const APP_PREFIX_PATH = "/app";

export const THEME_CONFIG = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  locale: "en",
  navType: NAV_TYPE_SIDE,
  topNavColor: "#3e82f7",
  headerNavColor: "",
  mobileNav: false,
  currentTheme: "dark",
  direction: DIR_LTR,
};
