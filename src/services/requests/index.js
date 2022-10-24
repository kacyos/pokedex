import { api } from "../api";

const getPokemons = async (perPage, pageNumber) => {
  const { data } = await api.get("pokemon", {
    params: {
      limit: perPage,
      offset: pageNumber,
    },
  });

  const pokemons = await Promise.all(getPokemonsByNameOrId(data.results));

  return { count: data.count, pokemons };
};

const getPokemonsByNameOrId = (array) => {
  const response = array.map(async (item) => {
    const { data } = await api.get(`pokemon/${item.name}`);
    return data;
  });

  return response;
};

export { getPokemons };
