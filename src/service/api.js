/* eslint-disable prettier/prettier */
import axios from "axios";

const api = axios.create({
 baseURL: "https://ecosec.herokuapp.com/",
});

export default api;
