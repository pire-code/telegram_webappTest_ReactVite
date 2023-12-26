import axios from "axios";

const instance = axios.create({
    baseURL: 'http://0.tcp.eu.ngrok.io:19633'
})

export default instance