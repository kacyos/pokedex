import { api } from "../api";

const getPokemons = async (limit) => {
  const { data } = await api.get("pokemon", {
    params: {
      limit,
      offset: limit,
    },
  });

  const pokemons = await Promise.all(getPokemonsByNameOrId(data.results));
  console.log(pokemons);
  return pokemons;
};

const getPokemonsByNameOrId = (array) => {
  const response = array.map(async (item) => {
    const { data } = await api.get(`pokemon/${item.name}`);
    return data;
  });

  return response;
};

export { getPokemons };
