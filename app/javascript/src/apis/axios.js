import axios from "axios";
import { t } from "i18next";
import { setToLocalStorage, getFromLocalStorage } from "utils/storage";

import { Toastr } from "../components/commons";

const DEFAULT_ERROR_NOTIFICATION = t("messages.somethingWentWrong");

axios.defaults.baseURL = "/";

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response.data;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({ authToken: null, email: null, userId: null });
    setTimeout(() => (window.location.href = "/login"), 2000);
  }

  if (
    axiosErrorObject.response?.status === 404 &&
    axiosErrorObject.response?.data.error === "Couldn't find User"
  ) {
    setToLocalStorage({ authToken: null, email: null, userId: null });
    window.location.href = "/login";
  }

  Toastr.error(
    axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
  );
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};

const resetAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};

export { setAuthHeaders, registerIntercepts, resetAuthTokens };
