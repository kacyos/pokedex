<script setup>
import { getPokemons } from "../services/requests";
import Card from "../components/Card.vue";
import Paginator from "@/components/Paginator.vue";
</script>

<template>
  <main>
    <ul class="container">
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <Card
          :image="pokemon.sprites.other['official-artwork'].front_default"
          :name="pokemon.name"
          :types="pokemon.types"
        />
      </li>
    </ul>
    <Paginator :total="count" :perPage="perPage" :handlePage="handlePage" />
  </main>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      perPage: 0,
      count: 0,
      pokemons: [],
    };
  },
  components: {
    Card,
    Paginator,
    // HelloWorld,
  },
  created() {
    this.loadPokemons();
  },
  methods: {
    async loadPokemons() {
      const response = await getPokemons(20);
      this.pokemons = response?.pokemons;
      this.count = response?.count;
      this.perPage = response?.pokemons.length;
    },

    async handlePage(pageNumber) {
      const response = await getPokemons(20, pageNumber);
      this.pokemons = response?.pokemons;
      console.log(response.pokemons);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  height: auto;
}
</style>
