import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://quicktalk-web-app.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});