<script setup>
import { getPokemonSpecie, getEvolutionChain } from "@/services/requests";
import EvolutionView from "@/components/Evolution.vue";
</script>
<template>
  <div class="container mx-auto">
    <div>
      <div
        class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
        @click="$emit('close')"
      >
        <div
          class="max-w-2xl md:max-w-md max-h-[80%] overflow-auto p-2 mx-4 bg-white rounded-md shadow-xl"
        >
          <div class="flex items-center justify-between">
            <h1 class="text-3xl">{{ pokemon.name }}</h1>
            <button
              @click="isOpen = false"
              class="w-8 h-8 text-red-500 cursor-pointer"
            >
              <mdicon name="closeCircleOutline" />
            </button>
          </div>

          <div class="flex flex-col justify-center items-center gap-4 mt-4">
            <figure
              class="flex justify-center items-center bg-blue-200 rounded-full h-36 w-36"
            >
              <img
                class="h-32"
                :src="pokemon.sprites.other['official-artwork'].front_default"
                :alt="pokemon.name"
              />
            </figure>
            <p class="text-center text-md font-semibold">
              {{ specie.description }}
            </p>
          </div>

          <div class="mt-4 mb-4 bg-gray-200 rounded-md w-full p-2">
            <h3 class="text-center text-lg font-semibold md:pb-4">Status</h3>
            <div
              class="grid md:grid-rows-3 md:grid-cols-2 md:place-content-around"
            >
              <div
                v-for="pokemon in pokemon.stats"
                class="flex items-center sm:gap-1"
                :key="pokemon.stat.name"
              >
                <mdicon
                  :class="icon[pokemon?.stat.name].color"
                  :name="icon[pokemon?.stat.name].icon"
                  size="18"
                />
                <span class="font-semibold px-1">
                  {{ pokemon.stat.name }}:
                </span>
                <span :key="pokemon.base_stat">
                  {{ pokemon.base_stat }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4" v-if="specie.hasChildren">
            <h2 class="text-lg font-semibold">Evolutions</h2>
            <EvolutionView v-bind:items="specie.evolutions" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-body">
          <button class="close-button" @click="$emit('close')">
            <mdicon name="closeCircleOutline" />
          </button>
          <figure>
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
              srcset=""
            />
          </figure>

          <h1 class="header" name="header">{{ pokemon.name }}</h1>

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
              <mdicon class="icon" :name="icon[pokemon?.stat.name]" size="18" />
            </div>
          </div>

          <div class="description">
            {{ specie.description }}
          </div>

          <div class="evolutions">
            <h2>Evolutions</h2>
            <EvolutionView
              v-bind:items="specie.evolutions"
              v-if="specie.hasChildren"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>-->
</template>

<script>
export default {
  name: "modalComponent",
  data() {
    return {
      specie: {},
      icon: {
        hp: { icon: "heart", color: "text-red-500" },
        attack: { icon: "sword", color: "text-gray-600" },
        defense: { icon: "shield", color: "text-blue-500" },
        "special-attack": { icon: "swordCross", color: "text-gray-700" },
        "special-defense": { icon: "shieldStar", color: "text-blue-700" },
        speed: { icon: "runFast", color: "text-green-500" },
      },
    };
  },
  components: {
    //EvolutionView,
  },
  props: {
    pokemon: Object,
  },

  created() {
    this.loadModal();
  },

  methods: {
    async loadModal() {
      const pokemonSpecie = await getPokemonSpecie(this.pokemon.species.name);
      const { id, flavor_text_entries, evolution_chain } = pokemonSpecie;

      const pokemonEvolution =
        evolution_chain && (await getEvolutionChain(evolution_chain?.url));

      const description = flavor_text_entries
        ?.find((item) => item.language.name == "en")
        .flavor_text.replace("\f", "");

      this.specie = {
        id,
        description,
        evolutions: pokemonEvolution?.evolutions,
        hasChildren: pokemonEvolution?.hasChildren,
      };
    },
  },
};
</script>

<style>
/*
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
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: auto;
}

.close-button {
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
  left: 70%;
  top: 40px;

  & :hover {
    color: rgb(66, 66, 66);
  }
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

  > h1 {
    display: inline-block;
    padding-bottom: 10px;
  }
}

.icon {
  color: rgb(84, 84, 84);
}
.evolutions {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.pokemon-status {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.description {
  width: 80%;
  padding: 10px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}*/
</style>
