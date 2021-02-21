import axios from "axios";

export default axios.create({
  baseURL: "https://retopin.com/backend/public/api/topRetailers",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});
