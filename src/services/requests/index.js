import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2";

const getPokemons = async (offset) => {
  try {
    const { data } = await axios.get(`${baseURL}/pokemon`, {
      params: {
        limit: 25,
        offset,
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

const getPokemonsByNameOrId = async (name) => {
  try {
    const { data } = await axios.get(`${baseURL}/pokemon/${name}`);
    return data;
  } catch {
    console.error("Falha ao buscar pokemon por nome ou id");
  }
};

const getPokemonSpecie = async (name) => {
  try {
    const { data } = await axios.get(`${baseURL}/pokemon-species/${name}`);
    return data;
  } catch (error) {
    console.error("Falha ao buscar specie.");
  }
};

const getEvolutionChain = async (url) => {
  try {
    const { data } = await axios.get(url);
    const evolutions = recursiveSearchEvolution(data.chain);
    console.log(evolutions);
    return { evolutions };
  } catch (error) {
    console.error("Falha ao buscar Evolution Chain.");
  }
};

function recursiveSearchEvolution(array) {
  const name = array.species.name;
  const id = parseInt(
    array.species.url
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .replace("/", "")
  );
  array.evolves_to.foreach((e) => console.log(e));
  return {
    id,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    evolutions: [],
  };
}

export {
  getPokemons,
  getPokemonsByNameOrId,
  getPokemonSpecie,
  getEvolutionChain,
};
