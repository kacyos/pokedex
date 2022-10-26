<script setup>
import { getPokemonSpecie, getEvolutionChain } from "@/services/requests";
</script>
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-body">
          <figure>
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
              srcset=""
            />
          </figure>

          <h1 name="header">{{ pokemon.name }}</h1>

          <div class="pokemon-status">
            <div
              v-for="pokemon in pokemon.stats"
              class="status"
              :key="pokemon.stat.name"
            >
              <span> {{ pokemon.stat.name }}: </span>
              <span :key="pokemon.base_stat">
                {{ pokemon.base_stat }}
              </span>
            </div>

            <div class="description">
              {{ specie.flavorText?.flavor_text }}
            </div>
          </div>

          <button class="modal-default-button" @click="$emit('close')">
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modalComponent",
  data() {
    return {
      name: "",
      specie: {},
      evolution: "",
    };
  },
  props: {
    pokemon: Object,
  },

  created() {
    this.name = this.pokemon.name;
    this.loadModal();
  },

  methods: {
    async loadModal() {
      const pokemonSpecie = await getPokemonSpecie(this.name);
      const { id, flavor_text_entries, evolution_chain } = pokemonSpecie;
      const evolutionChain = await getEvolutionChain(id);

      console.log({ evolutionChain });

      const flavorText = flavor_text_entries?.find(
        (item) => item.version.name == "shield" && item.language.name == "en"
      );

      this.specie = {
        id,
        flavorText,
        evolution_chain,
      };
    },
  },
};
</script>

<style lang="scss">
.modal-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
}

.modal-container {
  height: 90%;
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: auto;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;

  > figure {
    display: flex;
    justify-content: center;
    background-color: rgb(114, 200, 38);
    height: 200px;
    width: 200px;
    border-radius: 50%;

    > img {
      height: 100%;
      width: 100%;
    }
  }
}

.pokemon-status {
  background-color: aqua;
  width: 100%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
