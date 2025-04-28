import { Button } from '@/components/ui/button';
import { useNavigate, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Oops!</h1>
        <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
        <div className="text-muted-foreground mb-8">
          <p className="mb-2">We're sorry for the inconvenience.</p>
          <p className="bg-muted rounded-md p-4 font-mono text-sm">
            {error?.message || 'An unexpected error occurred'}
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          {/* <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.DASHBOARD)}>
            Go to Dashboard
          </Button> */}
        </div>
      </div>
    </div>
  );
};
