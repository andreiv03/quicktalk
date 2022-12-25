import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : `${process.env.SERVER_URL!}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});
