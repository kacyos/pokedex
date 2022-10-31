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
  if (url) {
    try {
      const { data } = await axios.get(url);
      const result = recursiveSearchEvolution(data.chain);
      const evolutions = await mapTreeviewNodes(Array(result));
      const [pokemon] = evolutions;
      const hasChildren = !!pokemon.children.length;
      return { evolutions, hasChildren };
    } catch (error) {
      console.error("Falha ao buscar Evolution Chain.");
    }
  } else {
    return [];
  }
};

function recursiveSearchEvolution(array) {
  const name = array.species.name;
  const id = parseInt(
    array.species.url
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .replace("/", "")
  );

  return {
    id,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    children: array.evolves_to.map((e) => recursiveSearchEvolution(e)),
  };
}

async function mapTreeviewNodes(items) {
  const array = items.map(async (i) => {
    const image = await getPokemonsByNameOrId(i.name.toLowerCase());

    return {
      id: i.id,
      name: i.name,
      imageUrl: image.sprites.other["official-artwork"].front_default,
      children: await mapTreeviewNodes(i.children),
    };
  });
  const response = await Promise.all(array);
  return response;
}

export {
  getPokemons,
  getPokemonsByNameOrId,
  getPokemonSpecie,
  getEvolutionChain,
};
