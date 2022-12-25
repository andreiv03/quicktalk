import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://quicktalk-andreiv03.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});
