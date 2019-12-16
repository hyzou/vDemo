import Cookies from "js-cookie";

const TokenKey = "shlztb_system";
const sessionKey = "s_sessionId";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setSessionId(sessionId) {
  return Cookies.set(sessionKey, sessionId);
}

export function getSessionId() {
  return Cookies.get(sessionKey);
}

export function removeSessionId() {
  return Cookies.remove(sessionKey);
}
