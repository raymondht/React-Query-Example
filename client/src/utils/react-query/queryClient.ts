import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({defaultOptions: {
    queries: {
        refetchOnWindowFocus: process.env.NODE_ENV == "development" ? false: true,
        useErrorBoundary: true
    }
}})