<script lang="ts">
import { store } from '@/store/store';
import Pokedex from '@/services/Pokedex';
import image from "../assets/question_mark.png"
interface Pokemon {
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

export default
{
data() {
  return {
    pokedexList: [] as Pokemon[],
    next_url: '' as string,
    root: null as null | HTMLElement,
    qm: image
  }
},
methods: {
  async next(){
    try {
    const response = await Pokedex.methods.getCustomRequest(this.next_url);
    this.pokedexList = response.data.results;
    this.next_url = response.data.next;
    for(const key in this.pokedexList)
    {
      let value = this.pokedexList[key];
      value.details = (await Pokedex.methods.getCustomRequest(value.url)).data;
    }
  } catch (error) {
    console.log(error);
  } 
  }
},
async mounted() {
  try {
    const response = await Pokedex.methods.getPokedexList(10,0);
    this.pokedexList = response.data.results;
    this.next_url = response.data.next;
    for(const key in this.pokedexList)
    {
      let value = this.pokedexList[key];
      value.details = (await Pokedex.methods.getCustomRequest(value.url)).data;
    }
  } catch (error) {
    console.log(error);
  } 
}
}
</script>

<template>
  <main>
    <v-btn @click="next">
      Next
    </v-btn>
    <v-list>
      <v-list-item v-for="pokemon in pokedexList">
          <v-list-item-title>        
            <v-col cols="auto" lg="6">
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5 text-uppercase">
                    {{ pokemon.name }}
                  </v-card-title>
                    <v-card-subtitle v-if="pokemon.details" style="color: white;">
                      #{{ String(pokemon.details.id).padStart(5, '0') }}
                    </v-card-subtitle>
                    
 
                      <v-chip-group class="ml-3">
                          <v-chip
                            variant="elevated"
                            v-if="pokemon.details"
                            v-for="type in pokemon.details.types"  
                            :class="'custom-' + type.type.name"
                            :key="type.type.name"
                          >
                            {{ type.type.name }}
                          </v-chip>
                    </v-chip-group>

                    
                </div>
                <v-avatar
                  class="ma-3"
                  size="75"
                  rounded="0"
                  >
                  
                  <v-img 
                  v-if="pokemon.details" 
                  :src="pokemon.details.sprites.versions['generation-v']['black-white'].animated.front_default ?
                  pokemon.details.sprites.versions['generation-v']['black-white'].animated.front_default:
                  pokemon.details.sprites.other['official-artwork'].front_default ? 
                  pokemon.details.sprites.other['official-artwork'].front_default :
                  pokemon.details.sprites.front_default ? pokemon.details.sprites.front_default : qm"
                  >
                  <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-darken-1"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
                  </v-img>
                  
                </v-avatar>
              </div>
            </v-card>
          </v-col>
          </v-list-item-title>
      </v-list-item>
    </v-list>
  </main>
</template>

<style scoped>

.custom-poison {
    background-color: #A33EA1;
    color: white;
  }
  .custom-grass {
    background-color: #7AC74C;
    color: white;
  }

  .custom-fire {
    background-color: #EE8130;
    color: white;
  }

  .custom-water{
    opacity: 100;
    background-color: #6390F0;
    color: white;
  }

  
  .custom-bug {
    background-color: #A6B91A;
    color: white;
  }


  .custom-ground{
    color: white;
    background-color: #E2BF65;
  }

  
  .custom-normal{
    color: white;
    background-color: #A8A77A;
  }

  .custom-flying{
    color: white;
    background-color: #A98FF3;
  }


  .custom-electric{
    color: white;
    background-color: #F7D02C;
  }


  .custom-fairy{
    color: white;
    background-color: #D685AD;
  }

  .custom-fighting{
    color: white;
    background-color: #C22E28;
  }
  
  .custom-psychic{
    color: white;
    background-color: #F95587;
  }
  .custom-rock{
    color: white;
    background-color: #B6A136;
  }

  .custom-ice{
    color: white;
    background-color: #96D9D6;
  }

  .custom-dragon{
    color: white;
    background-color: #6F35FC;
  }

  .custom-dark{
    color: white;
    background-color: #705746;
  }

  .custom-ghost{
    color: white;
    background-color: #735797;
  }

  .custom-steel{
    color: white;
    background-color: #B7B7CE;
  }
.v-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    border-top: 150px solid white;
    border-left: 150px solid #424040;
    width: 16rem;
}
.v-card{
background-color: #424040 ;
}
.v-card:hover{
  opacity: 75%;
}
.v-avatar
{
  z-index: 1000;
}
.text-h5
{
  color: white;
  font-weight: bold;
  font-size: 20px!important;
}
</style>
