import axios from "axios";

export const BASE_URL_V1 = "/api/v1/users";

export default {
  me() {
    return axios.get(`${BASE_URL_V1}/me`);
  }
};
