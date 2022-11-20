import AxiosApi from '../../../axiosApi';
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../query-key-factory';

const getAllPokemon = async (): Promise<Array<any>> => {
    const api = new AxiosApi();
    try {
        const response = await api.get(
            "pokemon",
        );
        console.log({response});
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            const {
                response: { data, status, statusText },
            } = error;
            const errorResponse = JSON.stringify({
                data,
                status,
                statusText,
            });
            // logger(
            //     `Error retrieving Schema List for Domain '${domainAlias}': ${errorResponse}`,
            //     'error',
            // );
        }
        throw error;
    }
};

const useAllPokemon = (isEnabled?: boolean ) => {
    return useQuery<Array<any>>(
        queryKeyFactory.pokemonKeys.all,
        getAllPokemon,
        {
            enabled: isEnabled,
        },
    );
};

export default useAllPokemon;
