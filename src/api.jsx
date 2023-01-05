import axios from "axios";


const api = axios.create({
    baseURL: 'https://tugerente-60662-default-rtdb.firebaseio.com/'
})
export default api;