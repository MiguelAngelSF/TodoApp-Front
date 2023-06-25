import axios from "./axios";
 
export const loginPost = user => axios.post('/login', user);
export const registerPost = user => axios.post('/register', user);
export const verityTokenRequet = () => axios.get('/verify');