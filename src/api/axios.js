import axios from 'axios';
// baseURL: 'https://ecosec.herokuapp.com/api'
export default axios.create({
    baseURL: 'http://localhost:8080/api'
});