import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        {/* <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.DASHBOARD)}>Go to Dashboard</Button> */}
      </div>
    </div>
  );
};
