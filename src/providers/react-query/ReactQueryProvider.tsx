import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';

export type ErrorPayload = { message: string; timestamp: string };

export interface GenericError extends AxiosError {
  data?: ErrorPayload;
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: GenericError;
  }
}

interface QueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 0,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 0
    }
  }
});

export function ReactQueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
