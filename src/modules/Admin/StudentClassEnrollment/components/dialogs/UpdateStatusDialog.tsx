import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  type UpdateEnrollmentFormData,
  updateEnrollmentSchema
} from '@/modules/Admin/StudentClassEnrollment/schemas/enrollment.schema';
import { EnrollmentStatus } from '@/modules/Admin/StudentClassEnrollment/types/enrollment.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface UpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (data: UpdateEnrollmentFormData) => void;
  isPending?: boolean;
}

export const UpdateStatusDialog = ({
  open,
  onOpenChange,
  onUpdate,
  isPending = false
}: UpdateStatusDialogProps) => {
  const formMethods = useForm({
    resolver: zodResolver(updateEnrollmentSchema),
    defaultValues: {
      status: EnrollmentStatus.ENROLLED,
      remarks: ''
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Enrollment Status</DialogTitle>
        </DialogHeader>
        <CustomForm formMethods={formMethods} onSubmit={onUpdate} className="space-y-4">
          <CustomForm.Select
            field={{
              name: 'status',
              label: 'Status',
              options: [
                { label: 'Enrolled', value: EnrollmentStatus.ENROLLED },
                { label: 'Completed', value: EnrollmentStatus.COMPLETED },
                { label: 'Failed', value: EnrollmentStatus.FAILED }
              ]
            }}
          />
          <CustomForm.Textarea
            field={{
              name: 'remarks',
              label: 'Remarks',
              placeholder: 'Enter remarks (optional)'
            }}
          />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
};
