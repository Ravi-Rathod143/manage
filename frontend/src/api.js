import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://manage-3-ta7c.onrender.com/api",
});


export default API;