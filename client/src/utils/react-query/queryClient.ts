import { MutationCache, Query, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const queryErrorHandler = (error: unknown, query: Query) => {
    // 🎉 only show error toasts if we already have data in the cache
    // which indicates a failed background update
    if (query.state.data !== undefined) {
        showToast(error as ErrorResponse);
    }
};

const mutationErrorHandler = (error: unknown) => {
    showToast(error as ErrorResponse)
};

const showToast = (error: ErrorResponse)  => {
    toast.error(
        `Something went wrong. ${ error.errorMessage} `,
        {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: 'colored',
        }
    );
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus:  true,
            retry: 1
        },
        mutations: {
            onError: mutationErrorHandler
        }
    },
    queryCache: new QueryCache({
        onError: queryErrorHandler,
    })
});

export type ErrorResponse = { statusCode: number, errorMessage: string };

export const buildErrorResponse = (
    e: any,
    errorContext: object
): ErrorResponse => {
    try {
        const error = e as AxiosError;

        if (!error.response) throw new Error('No response in error object');
        const {
            response: { data, status, statusText },
        } = error;
        const errorResponse = JSON.stringify({
            data,
            status,
            statusText,
        });

        let errorMessage;
        switch (status) {
            case 500:
                errorMessage = '(500)';
                break;
            case 400:
               if (typeof data === 'object' && data !== null && 'errors' in data) {
                    // errorMessage = buildErrorMessageFromModelState((data as any)['errors']);
                    console.error('Error', {data});
                    errorMessage = 'Errors'
                } else {
                    errorMessage = data as string;
                }
                break;
            default:
                errorMessage = data as string;
        }

        console.error(
            `Message: ${errorMessage} \n
             Response: ${errorResponse} \n
             Error Context: ${errorContext}`
        );

        const result = {
            statusCode: status,
            errorMessage: errorMessage,
        };
        console.log({result});

        return result;
    } catch (err: any) {
        console.error(JSON.stringify(err), 'error');
        return {
            statusCode: 500,
            errorMessage: "Oops, there was something wrong.",
        };
    }
};

// const buildErrorMessageFromModelState = (errors: Array<string[]>): string => {
//     const keys = Object.keys(errors);

//     const result: string[] = [];
//     for (const key of keys) {
//         if (!key || !errors[key]) continue;

//         const x: string[] = errors[key];
//         result.push(`${key} - ${x.join()}`);
//     }

//     return result.join('.  ');
// };
