<script setup></script>
<template>
  <div
    class="flex flex-col justify-center items-center h-52 md:h-60 w-44 md:w-52 p-2 border rounded-md border-gray-500 bg-lime-50 cursor-pointer hover:scale-125 ease-in duration-300"
    @click="$emit('click')"
  >
    <figure
      class="flex justify-center items-center h-24 md:h-32 w-24 md:w-32 rounded-full bg-gradient-to-r from-gray-100 to-blue-300"
    >
      <img
        class="object-contain h-24 md:h-28 w-24 md:w-28"
        :src="image"
        :alt="name"
      />
    </figure>

    <h1 class="text-lg md:text-2xl text-center pb-4 text-gray-600 font-bold">
      {{ name }}
    </h1>

    <div class="flex align-center justify-center gap-4">
      <span
        v-for="pokemon in types"
        :key="pokemon.type.slot"
        v-bind:class="[
          'rounded-xl  p-1 text-center text-gray-900 font-bold',
          pokemon.type.name,
        ]"
      >
        {{ pokemon.type.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    image: String,
    name: String,
    types: Array,
  },
};
</script>

<style scoped>
.fire {
  background-color: #ef4444;
}
.grass {
  background-color: #22c55e;
}
.flying {
  background-color: #bae6fd;
}

.poison {
  background-color: #8b5cf6;
}
.water {
  background-color: #3b82f6;
}

.bug {
  background-color: #6ee7b7;
}

.normal {
  background-color: #dadada;
}

.electric {
  background-color: #eab308;
}

.dragon {
  background-color: #fdba74;
}
.ghost {
  background-color: #9333ea;
}
.psychic {
  background-color: #d8b4fe;
}
.fairy {
  background-color: #ddd6fe;
}
.rock {
  background-color: #57534e;
}

.ground {
  background-color: #a8a29e;
}

.dark {
  background-color: #374151;
}

.steel {
  background-color: #9ca3af;
}

.fighting {
  background-color: #a1a1aa;
}

.ice {
  background-color: #dbebff;
}
</style>
