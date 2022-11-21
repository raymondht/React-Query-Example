import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const queryErrorHandler = (error: unknown) => {
    if (error instanceof AxiosError) {
        // Trigger a snack bar for user's error
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus:
                process.env.NODE_ENV == 'development' ? false : true,
            useErrorBoundary: (error: any) =>  error.response?.status >= 500;
            retry: 1, //Temp
        },
    },
    queryCache: new QueryCache({
        onError: queryErrorHandler
    }),
});

// export type ArchiveUnArchiveFormError = { message: string };
// export type ErrorResponse = { errorMessage: string };

// export const buildErrorResponse = (
//     e: any,
//     message: string,
//     domainAlias: string,
//     formId?: string,
// ): ErrorResponse => {
//     try {
//         const error = e as AxiosError;

//         if (!error.response) throw new Error('No response in error object');

//         const {
//             response: { data, status, statusText },
//         } = error;
//         const errorResponse = JSON.stringify({
//             data,
//             status,
//             statusText,
//         });
//         conso(
//             `Message: ${message} \n
//                   Domain: ${domainAlias} \n
//                   FormId: ${formId ?? 'Not provided'} \n
//                   Response: ${errorResponse}`,
//             'error',
//         );

//         let errorMessage;
//         switch (status) {
//             case 500:
//                 errorMessage = '(500)';
//                 break;
//             case 400:
//                 if (typeof data === 'object' && data !== null && 'errors' in data) {
//                     // eslint-disable-next-line @typescript-eslint/dot-notation
//                     errorMessage = buildErrorMessageFromModelState(data['errors']);
//                 } else {
//                     errorMessage = data;
//                 }
//                 break;
//             default:
//                 errorMessage = data;
//         }

//         const result = {
//             errorMessage: errorMessage,
//         };

//         return result;
//     } catch (err: any) {
//         logger(JSON.stringify(err), 'error');
//         return {
//             errorMessage: languageItems.ERROR_UNKNOWN,
//         };
//     }
// };

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
