import { MutationCache, Query, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const queryErrorHandler = (error: unknown, query: Query) => {
    // 🎉 only show error toasts if we already have data in the cache
    // which indicates a failed background update
    if (query.state.data !== undefined) {
        showToast(error as AxiosError)
    }
};

const mutationErrorHandler = (error: unknown) => {
    showToast(error as AxiosError)
};

const showToast = (error: AxiosError)  => {
    toast.error(
        `Something went wrong. ${
            error.response?.statusText
        } `,
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
            refetchOnWindowFocus: process.env.NODE_ENV == 'development' ? false : true,
            retry: 1, //Temp,
        },
    },
    queryCache: new QueryCache({
        onError: queryErrorHandler,
    }),
    mutationCache: new MutationCache({
        onError: mutationErrorHandler
    }),
});

export type ErrorResponse = { errorMessage: string };

export const buildErrorResponse = (
    e: any,
    message: string,
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

        console.error(
            `Message: ${message} \n
             Response: ${errorResponse} \n
             Error Context: ${errorContext}`
        );

        let errorMessage;
        switch (status) {
            case 500:
                errorMessage = '(500)';
                break;
            case 400:
                if (typeof data === 'object' && data !== null && 'errors' in data) {
                    // eslint-disable-next-line @typescript-eslint/dot-notation
                    errorMessage = buildErrorMessageFromModelState(data['errors']);
                } else {
                    errorMessage = data;
                }
                break;
            default:
                errorMessage = data;
        }

        const result = {
            errorMessage: errorMessage,
        };

        return result;
    } catch (err: any) {
        logger(JSON.stringify(err), 'error');
        return {
            errorMessage: languageItems.ERROR_UNKNOWN,
        };
    }
};

const buildErrorMessageFromModelState = (errors: Array<string[]>): string => {
    const keys = Object.keys(errors);

    const result: string[] = [];
    for (const key of keys) {
        if (!key || !errors[key]) continue;

        const x: string[] = errors[key];
        result.push(`${key} - ${x.join()}`);
    }

    return result.join('.  ');
};
