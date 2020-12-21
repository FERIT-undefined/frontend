import axios from "axios";
import moment from "moment";
import token from "jsonwebtoken";
import { persistor, store } from "./store/store";

const UNAUTHORIZED = 401;
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function getAuthData() {
  const locStore = store.getState();
  if (!locStore.tokenStore.jwt || !locStore.tokenStore.refreshToken) {
    const { jwt, refreshToken, currentUser } = locStore.tokenStore;
    return { jwt, refreshToken, currentUser };
  }
  return locStore ? locStore.tokenStore : "";
}

function onAccessTokenFetched(accessToken) {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

function isTokenExpiredError(errorResponse) {
  if (errorResponse) {
    return errorResponse.data.statusCode === UNAUTHORIZED;
  }
  return false;
}

export function logOutAndWipeLocalStorage() {
  persistor.pause();
  persistor
    .purge()
    .then(() => persistor.flush())
    .finally(() => {
      window.localStorage.clear();
      window.location.assign("/login");
    });
}

export function refreshAuthentication(refreshToken) {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/v0/auth/refresh`,
    data: { refreshToken },
  });
}

async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    const { refreshToken } = getAuthData();
    if (!refreshToken) {
      return Promise.reject(error);
    }
    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(accessToken => {
        errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await refreshAuthentication(refreshToken);
      if (response.status !== 200) {
        logOutAndWipeLocalStorage();
      }
      if (!response.data) {
        return Promise.reject(error);
      }
      const newToken = response.data.accessToken;
      const currentUser = token.decode(newToken);
      if (currentUser.exp <= moment.utc().unix()) {
        logOutAndWipeLocalStorage();
      }
      onAccessTokenFetched(newToken);
      isAlreadyFetchingAccessToken = false;
    }
    return retryOriginalRequest;
  } catch (err) {
    logOutAndWipeLocalStorage();
    return Promise.reject(err);
  }
}

export function intercept() {
  axios.interceptors.request.use(
    config => {
      if (!config.noAuth) {
        config.headers.Authorization = `Bearer ${getAuthData().jwt}`;
      }
      return config;
    },
    error => {
      if (
        getAuthData().currentUser &&
        getAuthData().currentUser.exp <= moment().utc().unix()
      ) {
        resetTokenAndReattemptRequest(error);
      }
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => response,
    error => {
      const errorResponse = error.response;
      if (isTokenExpiredError(errorResponse)) {
        return resetTokenAndReattemptRequest(error);
      }
      return Promise.reject(error);
    }
  );
}
