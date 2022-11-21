import AxiosApi from '../../../axiosApi';
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../query-key-factory';

const getAllPokemon = async (): Promise<Array<any>> => {
    const api = new AxiosApi();
    try {
        const response = await api.get("/pokemon");
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

const useAllPokemon = (isEnabled?: boolean) => {
    return useQuery<Array<any>>(
        queryKeyFactory.pokemonKeys.all,
        getAllPokemon,
        {
            enabled: isEnabled,
        },
    );
};

export default useAllPokemon;
