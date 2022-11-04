<script setup>
import { getPokemons, getPokemonsByNameOrId } from "../services/requests";
import Card from "../components/Card.vue";
import Paginator from "@/components/Paginator.vue";
import Modal from "@/components/Modal.vue";
</script>

<template>
  <main class="bg-blue-500 px-2 pb-5">
    <div
      v-if="pokemons.length"
      class="flex flex-col justify-center items-center gap-14 mb-10 w-full"
    >
      <img class="pt-14" src="../assets/logo.png" />
      <div class="flex justify-center items-center w-full">
        <input
          type="text"
          class="w-3/5 h-8 p-4 rounded outline-blue-500 border-blue-500 bg-gay-400 text-gray-600 text-lg font-semibold"
          placeholder="Search Pokemon"
          v-on:input="handleInput"
          v-on:keydown.enter="handleSearch"
          required
        />
        <button
          @click="handleSearch"
          v-on:keydown.enter="handleSearch"
          class="bg-blue-700 h-8 px-8 text-gray-200 hover:bg-blue-600 transition-all"
        >
          Buscar
        </button>
      </div>
    </div>
    <ul class="flex flex-wrap justify-center pb-5 gap-10 md:gap-8">
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <Card
          :image="pokemon.sprites.other['official-artwork'].front_default"
          :name="pokemon.name"
          :types="pokemon.types"
          @click="handleModal(pokemon.id)"
        />
      </li>
    </ul>
    <Modal v-if="modalIsOpen" @close="modalIsOpen = false" :pokemon="pokemon" />
    <Paginator
      v-if="pokemons.length > 1"
      :total="count"
      :perPage="perPage"
      :handlePage="handlePage"
    />
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
      inputText: this.value,
    };
  },
  components: {
    Card,
    Paginator,
    // HelloWorld,
  },
  mounted() {
    this.loadPokemons();
  },

  methods: {
    handleInput(event) {
      this.inputText = event.target.value;
    },

    async handleSearch() {
      if (this.inputText) {
        const pokemon = await getPokemonsByNameOrId(this.inputText);
        this.pokemons = Array(pokemon);
        return;
      }

      this.loadPokemons();
    },
    async loadPokemons() {
      const response = await getPokemons();
      this.pokemons = response?.pokemons;
      this.count = response?.count;
      this.perPage = response?.pokemons.length;
    },

    async handlePage(pageNumber) {
      const response = await getPokemons(pageNumber);
      this.pokemons = response?.pokemons;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    async handleModal(id) {
      const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
      this.pokemon = pokemon;
      this.modalIsOpen = true;
    },
  },
};
</script>

<style scoped></style>
