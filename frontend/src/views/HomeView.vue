<script lang="ts">
import { store } from '@/store/store';
import Pokedex,{type Pokemon} from '@/services/Pokedex';
import image from "../assets/question_mark.png"

export default
{
data() {
  return {
    pokedexList: [] as Pokemon[],
    next_url: '' as string,
    prev_url: '' as string,
    root: null as null | HTMLElement,
    qm: image,
    pages_to_show: 10,
    page: 1,
    rows_per_page: 10,
    count: 0
  }
},
methods: {
  async GetPage(newpage = 0)
  {
    if(newpage)
    {
      this.page = newpage;
    }
    let offset = (this.page * this.rows_per_page) - this.rows_per_page;
    try {
    const response = await Pokedex.methods.getPokedexList(this.rows_per_page,offset);
    this.pokedexList = response.data.results;
    this.next_url = response.data.next;
    this.prev_url = response.data.previous;
    this.count = response.data.count;
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
  this.GetPage();
},
}
</script>

<template>
  <main>
    <v-pagination
      v-model="page"
      :length="Math.ceil(count / rows_per_page)"
      :total-visible="pages_to_show"
      @update:model-value="GetPage(page)"
    ></v-pagination>

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
                            :class="'custom-' + type.type.name + ' type-chips'"
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
    <v-pagination
      v-model="page"
       id="bottom-pagination"
      :length="Math.ceil(count / rows_per_page)"
      :total-visible="pages_to_show"
      @update:model-value="GetPage(page)"
    ></v-pagination>
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
#bottom-pagination
{
  color: white;
}
</style>
