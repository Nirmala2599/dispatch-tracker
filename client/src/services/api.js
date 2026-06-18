import axios from "axios";

const API = axios.create({
  baseURL: "https://dispatch-tracker-pi8c.onrender.com/api"
});

export default API;