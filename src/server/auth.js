import axios from "axios";
 
const URL_API = "http://localhost:3000/api"

export const registerPost = user => axios.post(`${URL_API}/register`, user);