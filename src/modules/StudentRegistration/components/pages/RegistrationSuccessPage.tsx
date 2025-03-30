import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const RegistrationSuccessPage = () => {
  return (
    <div className="container mx-auto max-w-md py-20">
      <Card>
        <CardHeader>
          <div className="mb-2 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Registration Successful</CardTitle>
          <CardDescription className="text-center">
            Your registration has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Your application is now pending approval by the administration. You will receive an
            email once your registration has been approved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
