import axios from "axios";

export const BASE_URL_V1 = "/api/v1/info";

export default {
  get() {
    return axios.get(`${BASE_URL_V1}/`);
  }
};
