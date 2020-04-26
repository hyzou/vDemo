import { removeToken } from "./auth";

export function logout() {
  removeToken();
  this.$router.push("/");
}
