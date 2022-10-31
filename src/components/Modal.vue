<script setup>
import { getPokemonSpecie, getEvolutionChain } from "@/services/requests";
import EvolutionView from "@/components/Evolution.vue";
</script>
<template>
  <transition name="modal">
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
  </transition>
</template>

<script>
export default {
  name: "modalComponent",
  data() {
    return {
      specie: {},
      icon: {
        hp: "heart",
        attack: "sword",
        defense: "shield",
        "special-attack": "swordCross",
        "special-defense": "shieldStar",
        speed: "runFast",
      },
    };
  },
  components: {
    EvolutionView,
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
}
</style>
