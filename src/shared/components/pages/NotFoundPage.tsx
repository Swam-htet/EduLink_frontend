import { Button } from '@/components/ui/button';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white px-6 py-12 text-center shadow-sm">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="w-full" onClick={() => navigate(PRIVATE_ENDPOINTS.HOME)}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};
