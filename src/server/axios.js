import axios from "axios";
import { SERVER } from "./config";

const instance = axios.create({
    baseURL: SERVER,
    withCredentials: true,
});

export default instance;