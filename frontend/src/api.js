import axios from "axios";

const API = axios.create({
  baseURL: "https://manage-1-kb8g.onrender.com",
});

export default API;