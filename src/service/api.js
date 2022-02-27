
import axios from "axios";

const api = axios.create({
  //baseURL: "https://ecosec.herokuapp.com/",
  baseURL: "http://localhost:8088"
});

export default api;
