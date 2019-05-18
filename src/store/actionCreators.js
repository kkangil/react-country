import { bindActionCreators } from "redux";

import store from "./index";

import * as countryActions from "./modules/country";

const { dispatch } = store;

export const CountryActions = bindActionCreators(countryActions, dispatch);