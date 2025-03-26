import { Button } from '@/components/ui/button';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { useNavigate, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white px-6 py-12 text-center shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Oops!</h1>
        <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
        <div className="text-muted-foreground mb-8">
          <p className="mb-2">We're sorry for the inconvenience.</p>
          <p className="bg-muted rounded-md p-4 font-mono text-sm">
            {error?.message || 'An unexpected error occurred'}
          </p>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          <Button className="w-full" onClick={() => navigate(PRIVATE_ENDPOINTS.HOME)}>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
