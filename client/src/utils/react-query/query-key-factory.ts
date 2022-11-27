const pokemonKeys = {
    all: ['pokemons'] as const,
    list: (filters: string) => [...pokemonKeys.all, 'list', filters ] as const,
    detail: (id: number) => [...pokemonKeys.all, 'detail', id] as const,
};

const userKeys = {
    all: ['users'] as const,
    list: (filters: string) => [...userKeys.all, 'list', filters ] as const,
    detail: (id: number) => [...userKeys.all, 'detail',id] as const,
};

export const queryKeyFactory = {
    pokemonKeys: pokemonKeys,
    userKeys: userKeys
}
