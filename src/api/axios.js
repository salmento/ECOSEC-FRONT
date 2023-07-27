import axios from 'axios';
//baseURL: 'https://xidjumane.herokuapp.com/api'
// baseURL: 'https://ecosec.herokuapp.com/api'
export default axios.create({
    baseURL: 'http://localhost:8080/api'
});