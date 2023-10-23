<script lang="ts">
import { store } from '@/store/store';
import Pokedex from '@/services/Pokedex';

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

    }
  };
}

export default
{
data() {
  return {
    pokedexList: [] as Pokemon[],
    next_url: '' as string,
    root: null as null | HTMLElement,
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
      console.log(value);
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
                </div>

                <v-avatar
                  class="ma-3"
                  size="75"
                  rounded="0"
                  >
                  <v-img v-if="pokemon.details" :src="pokemon.details.sprites.versions['generation-v']['black-white'].animated.front_default"></v-img>
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
