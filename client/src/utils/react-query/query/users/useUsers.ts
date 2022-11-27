import AxiosApi from '../../../axiosApi';
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../query-key-factory';
import { ErrorResponse, buildErrorResponse } from '../../queryClient';

export type User = {
    id: string,
    name: string,
    avatar: string
};

const fetchUsers = async (): Promise<User[]> => {
    const api = new AxiosApi();
    try {
        const response = await api.get('http://localhost:5000/api/users');
        console.log({response});
        return response.data;
    } catch (error: any) {
        const errorContext = {
            instanceId: '543'
        }
        const errorResponse = buildErrorResponse(error, errorContext)
        throw errorResponse;
    }
};

const useUsers = (isEnabled?: boolean) => {
    return useQuery<User[], ErrorResponse>(
        queryKeyFactory.userKeys.all,
        fetchUsers,
        {
            enabled: isEnabled,
        },
    );
};

export default useUsers;
