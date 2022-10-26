import { api } from "../api";

const getPokemons = async (perPage, pageNumber) => {
  try {
    const { data } = await api.get("pokemon", {
      params: {
        limit: perPage,
        offset: pageNumber,
      },
    });

    const response = data?.results?.map(async (item) => {
      const pokemon = await getPokemonsByNameOrId(item.name);
      return pokemon;
    });

    const pokemons = await Promise.all(response);
    return { count: data.count, pokemons };
  } catch {
    console.error("Falha ao buscar pokemons.");
  }
};

const getPokemonsByNameOrId = async (idOrName) => {
  try {
    const { data } = await api.get(`pokemon/${idOrName}`);
    return data;
  } catch {
    console.error("Falha ao buscar pokemon por nome ou id");
  }
};

const getPokemonSpecie = async (name) => {
  try {
    const { data } = await api.get(`pokemon-species/${name}`);
    return data;
  } catch (error) {
    console.error("Falha ao buscar specie.");
  }
};

const getEvolutionChain = async (specieId) => {
  try {
    const { data } = await api.get(`evolution-chain/${specieId}`);
    return data;
  } catch (error) {
    console.error("Falha ao buscar Evolution Chain.");
  }
};

export {
  getPokemons,
  getPokemonsByNameOrId,
  getPokemonSpecie,
  getEvolutionChain,
};
