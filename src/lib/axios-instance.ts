import axios from 'axios'
const axiosInstance = axios.create({
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
    },
    withCredentials: false,
    withXSRFToken: false,

})

export default axiosInstance
