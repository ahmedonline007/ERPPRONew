import axios from 'axios';
import Config from '../Config/Config';

const instance = axios.create({
    baseURL: Config.defaultURLAPI() 
});

let token = window.localStorage.getItem("token");
let lang = window.localStorage.getItem("lang") || "ar";

instance.defaults.headers.common["Authorization"] = token;
instance.defaults.headers.common["lang"] = lang;
instance.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
//instance.defaults.headers.ge["Content-Type"] = "application/json";

export default instance;