<script setup>
import { getPokemons } from "../services/requests";
import Card from "../components/Card.vue";
import Paginator from "@/components/Paginator.vue";
import Modal from "@/components/Modal.vue";
</script>

<template>
  <main>
    <ul class="container">
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <Card
          :image="pokemon.sprites.other['official-artwork'].front_default"
          :name="pokemon.name"
          :types="pokemon.types"
          @click="handleModal(pokemon.id)"
        />
      </li>
      <Modal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        :pokemon="pokemon"
      />
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
      modalIsOpen: false,
      pokemon: "",
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
      const response = await getPokemons();
      this.pokemons = response?.pokemons;
      this.count = response?.count;
      this.perPage = response?.pokemons.length;
    },

    async handlePage(pageNumber) {
      const response = await getPokemons(pageNumber);
      this.pokemons = response?.pokemons;
    },

    async handleModal(id) {
      const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
      this.pokemon = pokemon;
      this.modalIsOpen = true;
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
