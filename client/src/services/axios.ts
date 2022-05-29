import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://quicktalk.andreiv03.vercel.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});