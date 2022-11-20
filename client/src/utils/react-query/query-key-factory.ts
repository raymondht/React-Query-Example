const pokemonKeys = {
    all: ['pokemon'] as const,
    lists: () => [...pokemonKeys.all, 'list'] as const,
    list: (filters: string) => [...pokemonKeys.lists(), { filters }] as const,
    details: () => [...pokemonKeys.all, 'detail'] as const,
    detail: (id: number) => [...pokemonKeys.details(), id] as const,
};

export const queryKeyFactory = {
    pokemonKeys: pokemonKeys
}
