import axios from 'axios'

const apiClient = axios.create({
    
    
    baseURL: "http://localhost:8080/api",
    headers:{
        "Access-Control-Allow-Origin":"*",
        "Content-Type":"application/json; charset=UTF-8"

    },
})
function getAuthtoken(){
    return localStorage.getItem("curewell_token");
}
apiClient.interceptors.request.use(config =>{
    const token = getAuthtoken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},error=>Promise.reject(error));
 export default apiClient;