<script lang="ts">
import { store } from '@/store/store';
import Pokedex from '@/services/Pokedex';

interface Pokemon {
  name: string;
  url: string;
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
    const response = await Pokedex.methods.getPokedexList(20,0);
    this.pokedexList = response.data.results;
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
          </v-list-item-title>
      </v-list-item>
    </v-list>
  </main>
</template>
