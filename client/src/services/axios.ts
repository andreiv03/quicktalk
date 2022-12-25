import axios from "axios";

console.log(process.env);

export default axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : `${process.env.REACT_APP_SERVER_URL!}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});
