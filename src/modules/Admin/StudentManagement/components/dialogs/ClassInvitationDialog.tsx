import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Class } from '@/modules/Admin/ClassManagement/types/class.types';

import { useState } from 'react';

interface ClassInvitationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classes: Class[];
  onSubmit: (id: number) => void;
  isPending: boolean;
  selectedStudents: number[];
}

export const ClassInvitationDialog = ({
  isOpen,
  onClose,
  onSubmit,
  selectedStudents,
  classes,
  isPending
}: ClassInvitationDialogProps) => {
  const [classId, setClassId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (classId) {
      onSubmit(classId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Class Invite</DialogTitle>
          <DialogDescription>
            Please select the class you want to send the invite to. Selected students will be added
            to the class. Students will be notified via email. Student count:{' '}
            {selectedStudents.length}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Select onValueChange={(value) => setClassId(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((classItem, index) => (
                <SelectItem key={index} value={classItem.id.toString()}>
                  {classItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!classId || isPending || selectedStudents.length === 0}
          >
            {isPending ? 'Sending...' : 'Send Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
