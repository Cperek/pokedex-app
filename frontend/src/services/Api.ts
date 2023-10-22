import axios from 'axios';

export const Api = () => {
    return axios.create({
        baseURL: `http://localhost:4000/`
    })
}

export const pokeApi = () => {
    return axios.create({
        baseURL: `https://pokeapi.co/api/v2/`
    })
}