import {Api, pokeApi, customApi} from '@/services/Api'

export default{
    methods: {
    getPokedexList(limit: number, offset: number)
    {
        return pokeApi().get(`pokemon?limit=${limit}&offset=${offset}`);
    },   
    getCustomRequest(url: string)
    {
        return customApi().get(url); 
    }
    }
}

export interface Pokemon {
    name: string;
    url: string;
    details?: {
      id: number,
      sprites: {
        back_default : string,
        front_default : string
        other: {
          "official-artwork":
          {
            front_default : string
          }
        },
        versions:{
           "generation-v": {
            "black-white": 
            {
                "animated": {
                    "front_default": string
                },
                "front_default": string,
            }
          }
        }
  
      },
      types: { type: { name: string } }[];
    };
  }
