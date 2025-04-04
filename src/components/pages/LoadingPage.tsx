export const LoadingPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Loading</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content...</p>
      </div>
    </div>
  );
};

// Loading component for smaller sections
export const LoadingSection = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
};
