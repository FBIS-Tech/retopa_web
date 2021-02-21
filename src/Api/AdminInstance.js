import axios from "axios";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
  baseURL: "https://retopin.com/retopa/public/api/admin_views",
  // headers: {
  //   Accept: "application/json",
  // },
});
