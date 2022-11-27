import AxiosApi from '../../../axiosApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../query-key-factory';
import { ErrorResponse, buildErrorResponse } from '../../queryClient';

export type PokemonListData = {
    name: string,
    url: string
}
export type PokemonResult = {
    next: string,
    previous: string,
    results: PokemonListData[]
};


const initialUrl = "https://pokeapi.co/api/v2/pokemon";
const fetchInfinitePokemon = async (url: string): Promise<PokemonResult> => {
    const api = new AxiosApi();
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error: any) {
        const errorContext = {
            instanceId: '543'
        }
        const errorResponse = buildErrorResponse(error, errorContext)
        throw errorResponse;
    }
};

const useAllPokemon = (isEnabled?: boolean) => {
    return useInfiniteQuery<PokemonResult, ErrorResponse>(
        queryKeyFactory.pokemonKeys.all,
        ({pageParam = initialUrl}) => fetchInfinitePokemon(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
            enabled: isEnabled,
        },
    );
};

export default useAllPokemon;
