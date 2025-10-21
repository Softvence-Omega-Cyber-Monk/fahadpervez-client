import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API + "/api/v1/",
})

//Buyer Register API call

export const BuyerRegister = (data: {name: string; email: string; password: string})=>{
    return api.post("users/register/customer", data)
}