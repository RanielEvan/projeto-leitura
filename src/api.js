import axios from "axios";

// console.log(process);

// const API_URL = process.env.VUE_APP_API_URL;
const API_URL = 'http://localhost:8000/api';

export default axios.create({
  baseURL: API_URL,
});
