import axios from "axios";

export default axios.create({
  baseURL: "https://retopin.com/retopa/public/api/tp_login",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});
