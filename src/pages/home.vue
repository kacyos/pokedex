<script setup>
import { getPokemons } from "../services/requests";
import Card from "../components/Card.vue";
</script>

<template>
  <main>
    <ul class="container">
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <Card
          :image="pokemon.sprites.other.dream_world.front_default"
          :name="pokemon.name"
          :types="pokemon.types"
        />
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      pokemons: [],
    };
  },
  components: {
    Card,
    // HelloWorld,
  },
  mounted() {
    this.loadPokemons();
  },
  methods: {
    async loadPokemons() {
      const response = await getPokemons();
      this.pokemons = response;
      console.log(response);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  height: auto;
}
</style>
