import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { StudentRegistrationForm } from '@/modules/StudentRegistration/components/forms/StudentRegistrationForm';
import type { StudentRegistrationFormData } from '@/modules/StudentRegistration/schemas/student.schema';
import StudentRegistrationService from '@/modules/StudentRegistration/services/studentRegistration.service';
import { selectTenantId } from '@/store/tenant.slice';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const StudentRegistrationPage = () => {
  const navigate = useNavigate();
  const tenantId = useSelector(selectTenantId);

  const registrationMutation = useMutation({
    mutationKey: ['student-registration'],
    mutationFn: (data: StudentRegistrationFormData) =>
      StudentRegistrationService.registerStudent(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Registration successful. Please wait for admin approval.');
      // Redirect to a success page
      navigate(PUBLIC_ENDPOINTS.REGISTRATION_SUCCESS);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  });

  const handleSubmit = (data: StudentRegistrationFormData) => {
    registrationMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* navbar for title with app name  */}
      <div className="mx-auto mb-4 max-w-4xl">
        <h1 className="text-xl font-semibold">TODO : {tenantId}</h1>
      </div>

      <div className="mx-auto mb-4 max-w-4xl">
        <h1 className="text-xl font-semibold">Student Registration</h1>
      </div>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Register as a Student</CardTitle>
          <CardDescription>
            Fill out the form below to register as a student. Your application will be reviewed by
            the administration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentRegistrationForm
            onSubmit={handleSubmit}
            isPending={registrationMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};
