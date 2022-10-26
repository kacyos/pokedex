<template>
  <div class="card" @click="$emit('click')">
    <figure class="card--figure">
      <img :src="image" :alt="name" />
    </figure>
    <h1>{{ name }}</h1>
    <div class="card--type">
      <span
        v-for="type in types"
        :key="type.type.slot"
        :class="type.type.name"
        >{{ type.type.name }}</span
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

<style lang="scss">
@import "../css/variables.scss";
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(112, 112, 112);
  box-shadow: 0px 0px 10px rgb(187, 187, 187);
  border-radius: 10px;
  height: 150px;
  width: 120px;
  background-color: rgba(210, 222, 255, 0.598);
  cursor: pointer;

  h1 {
    font-size: calc(1em + 1.1vw);
  }
}
.card--figure {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 50%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
}

.card--type {
  display: flex;
  gap: 5px;
  > span {
    color: rgb(44, 44, 44);
    font-weight: 500;
    font-size: calc(0.4em + 1vw);
    padding: 2.5px;
    border-radius: 5px;
  }
  .fire {
    background-color: rgb(255, 86, 86, 0.524);
    color: #fff;
  }
  .water {
    background-color: rgb(92, 173, 255);
    color: #fff;
  }
  .grass {
    background-color: rgb(1, 176, 1);
    color: #fff;
  }
  .electric {
    background-color: rgb(255, 255, 0, 0.524);
    color: rgb(104, 104, 104);
  }
  .ground {
    background-color: rgba(42, 17, 17, 0.524);
    color: #000;
  }
}

@media (min-width: 768px) {
  .card {
    height: 200px;
    width: 170px;
  }
}

@media (min-width: 768px) {
  .card {
    height: 200px;
    width: 170px;
  }
}

@media (min-width: 1024px) {
  .card {
    height: 250px;
    width: 220px;
  }
}
</style>
