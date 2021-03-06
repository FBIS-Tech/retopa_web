import axios from "axios";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
  baseURL: proxyurl + "https://retopin.com/retopa/public/api/dealer/app",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});
