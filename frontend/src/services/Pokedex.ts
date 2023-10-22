import {Api,pokeApi} from '@/services/Api'

export default{
    methods: {
    getPokedexList(limit: number, offset: number)
    {
        return pokeApi().get(`pokemon?limit=${limit}&offset=${offset}`);
    },   
    }
}
