<script lang="ts">
import { store } from '@/store/store';
import Pokedex from '@/services/Pokedex';

interface Pokemon {
  name: string;
  url: string;
  details?: {
    sprites: {
      back_default : string,
      front_default : string
    }
  };
}

export default
{
data() {
  return {
    pokedexList: [] as Pokemon[],
  }
},
async mounted() {
  try {
    const response = await Pokedex.methods.getPokedexList(100,0);
    this.pokedexList = response.data.results;
    for(const key in this.pokedexList)
    {
      let value = this.pokedexList[key];
      value.details = (await Pokedex.methods.getCustomRequest(value.url)).data;
    }
  } catch (error) {
    console.log(error);
  } 
},
}
</script>

<template>
  <main>
    <v-list>
      <v-list-item v-for="pokemon in pokedexList">
          <v-list-item-title>
            {{ pokemon.name }}
            <v-img v-if="pokemon.details" width="100" :src="pokemon.details.sprites.front_default"></v-img>
          </v-list-item-title>
      </v-list-item>
    </v-list>
  </main>
</template>
