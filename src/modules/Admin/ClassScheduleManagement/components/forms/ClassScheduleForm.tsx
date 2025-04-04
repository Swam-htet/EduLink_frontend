import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Class } from '@/modules/Admin/ClassManagement/types/class.types';
import {
  CreateClassScheduleFormData,
  createClassScheduleSchema
} from '@/modules/Admin/ClassScheduleManagement/schemas/classSchedule.schema';
import { Staff } from '@/modules/Admin/StaffManagement/types/staffManagement.types';
import { Subject } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { FieldErrors, useForm } from 'react-hook-form';

interface ScheduleFormFieldsProps {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  errors: FieldErrors<CreateClassScheduleFormData>;
}

const ScheduleFormFields = ({ index, onRemove, canRemove, errors }: ScheduleFormFieldsProps) => {
  const scheduleErrors = errors?.schedules?.[index];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Schedule #{index + 1}</CardTitle>
            <CardDescription>Enter schedule details</CardDescription>
          </div>
          {canRemove && (
            <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CustomForm.DatePicker
          field={{
            name: `schedules.${index}.date`,
            label: 'Date',
            placeholder: 'Select date',
            error: scheduleErrors?.date?.message
          }}
        />

        <CustomForm.TimePicker
          field={{
            name: `schedules.${index}.start_time`,
            label: 'Start Time',
            placeholder: 'Select start time',
            error: scheduleErrors?.start_time?.message
          }}
        />

        <CustomForm.TimePicker
          field={{
            name: `schedules.${index}.end_time`,
            label: 'End Time',
            placeholder: 'Select end time',
            error: scheduleErrors?.end_time?.message
          }}
        />

        <CustomForm.Input
          field={{
            name: `schedules.${index}.late_mins`,
            label: 'Late Minutes',
            placeholder: 'Enter late minutes',
            error: scheduleErrors?.late_mins?.message
          }}
        />
      </CardContent>
    </Card>
  );
};

interface ClassScheduleFormProps {
  classes: Class[];
  subjects: Subject[];
  staff: Staff[];
  onSubmit: (data: CreateClassScheduleFormData) => void;
}

export const ClassScheduleForm = ({
  classes,
  subjects,
  staff,
  onSubmit
}: ClassScheduleFormProps) => {
  const form = useForm<CreateClassScheduleFormData>({
    resolver: zodResolver(createClassScheduleSchema),
    defaultValues: {
      class_id: '',
      subject_id: '',
      staff_id: '',
      schedules: [
        {
          date: '',
          start_time: '',
          end_time: '',
          late_mins: '0'
        }
      ]
    }
  });

  const addSchedule = () => {
    const currentSchedules = form.getValues('schedules');
    form.setValue('schedules', [
      ...currentSchedules,
      {
        date: '',
        start_time: '',
        end_time: '',
        late_mins: '0'
      }
    ]);
  };

  const removeSchedule = (index: number) => {
    const currentSchedules = form.getValues('schedules');
    form.setValue(
      'schedules',
      currentSchedules.filter((_, i) => i !== index)
    );
  };

  const schedules = form.watch('schedules');
  const { errors } = form.formState;

  return (
    <CustomForm formMethods={form} onSubmit={onSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Common Details</CardTitle>
          <CardDescription>Select class, subject, and teacher for all schedules</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <CustomForm.Select
            field={{
              name: 'class_id',
              label: 'Class',
              placeholder: 'Select class',
              options: classes.map((classItem) => ({
                label: `${classItem.name} (${classItem.code})`,
                value: classItem.id.toString()
              }))
            }}
          />

          <CustomForm.Select
            field={{
              name: 'subject_id',
              label: 'Subject',
              placeholder: 'Select subject',
              options: subjects.map((subject) => ({
                label: `${subject.title} (${subject.code})`,
                value: subject.id.toString()
              }))
            }}
          />

          <CustomForm.Select
            field={{
              name: 'staff_id',
              label: 'Staff',
              placeholder: 'Select staff',
              options: staff.map((staffMember) => ({
                label: `${staffMember.first_name} ${staffMember.last_name}`,
                value: staffMember.id.toString()
              }))
            }}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        {schedules.map((_, index) => (
          <ScheduleFormFields
            key={index}
            index={index}
            onRemove={() => removeSchedule(index)}
            canRemove={index > 0}
            errors={errors}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button type="button" variant="outline" onClick={addSchedule}>
          <Plus className="mr-2 h-4 w-4" />
          Add Another Schedule
        </Button>
        <CustomForm.Button className="ml-auto">Create Schedules</CustomForm.Button>
      </div>
    </CustomForm>
  );
};
