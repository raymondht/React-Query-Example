import AxiosApi from '../../../axiosApi';
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../query-key-factory';
import { ErrorResponse, buildErrorResponse } from '../../queryClient';

const getAllPokemon = async (): Promise<Array<any>> => {
    const api = new AxiosApi();
    try {
        const response = await api.get("pokemon");
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
    return useQuery<Array<any>, ErrorResponse>(
        queryKeyFactory.pokemonKeys.all,
        getAllPokemon,
        {
            enabled: isEnabled,
        },
    );
};

export default useAllPokemon;
