<template>
  <div id="app">
    <ul class="container">
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <Card
          :image="pokemon.sprites.other.dream_world.front_default"
          :name="pokemon.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import Card from "./components/Card.vue";
import { getPokemons } from "./services/requests";
export default {
  name: "App",
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
    this.ge();
  },
  methods: {
    async ge() {
      const response = await getPokemons();
      this.pokemons = response;
      console.log(response);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
li {
  list-style: none;
}
</style>
