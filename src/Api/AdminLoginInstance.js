import axios from "axios";

export default axios.create({
  baseURL: "https://retopin.com/retopa/public/api/admin_login",
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
});
