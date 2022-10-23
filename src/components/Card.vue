<template>
  <div class="card">
    <figure class="card--figure">
      <img :src="image" :alt="name" />
    </figure>
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    image: String,
    name: String,
  },
};
</script>

<style lang="scss">
.card {
  border: 1px solid black;
  box-shadow: 0px 0px 10px black;
  border-radius: 10px;
  height: 300px;
  width: 250px;
}
.card--figure {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;

  background-color: aqua;
  > img {
    width: 30%;
  }
}
</style>
