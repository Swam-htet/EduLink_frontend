import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { Student } from '@/modules/StudentManagement/types/studentManagement.types';
import { useState } from 'react';

interface RejectRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (id: number, reason: string) => void;
  student: Student | null;
  isPending: boolean;
}

export const RejectRegistrationDialog = ({
  isOpen,
  onClose,
  onReject,
  student,
  isPending
}: RejectRegistrationDialogProps) => {
  const [reason, setReason] = useState('');

  const handleReject = () => {
    if (student && reason.trim()) {
      onReject(student.id, reason);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Student Registration</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this student registration.
          </DialogDescription>
        </DialogHeader>

        {student && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-muted-foreground text-sm">Name</p>
                <p className="font-medium">
                  {student.first_name} {student.last_name}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Student ID</p>
                <p className="font-medium">{student.student_id}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Reason for rejection</label>
              <Textarea
                placeholder="Enter reason for rejection"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={!reason.trim() || isPending}
          >
            {isPending ? 'Rejecting...' : 'Reject Registration'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
