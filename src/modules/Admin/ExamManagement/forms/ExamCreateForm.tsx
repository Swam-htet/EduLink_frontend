import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  createExamSchema,
  type CreateExamFormData
} from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import { QuestionType } from '@/modules/Admin/ExamManagement/types/exam.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';

interface ClassOption {
  value: string;
  label: string;
}

interface SubjectOption {
  value: string;
  label: string;
}

interface ExamCreateFormProps {
  onSubmit: (data: CreateExamFormData) => void;
  isPending: boolean;
  onCancel: () => void;
  classOptions: ClassOption[];
  subjectOptions: SubjectOption[];
}

export const ExamCreateForm = ({
  onSubmit,
  isPending,
  onCancel,
  classOptions,
  subjectOptions
}: ExamCreateFormProps) => {
  const formMethods = useForm<CreateExamFormData>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {}
  });

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'sections'
  });

  console.log('Form error ', formMethods.formState.errors);

  const addSection = () => {
    append({
      section_number: (fields.length + 1).toString(),
      section_title: `Section ${fields.length + 1}`,
      section_description: '',
      question_type: QuestionType.MULTIPLE_CHOICE
    });
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Exam Details</h3>
        <p className="text-muted-foreground text-sm">
          Provide the basic information about the exam
        </p>
        <Separator className="my-4" />

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomForm.Input
            field={{
              name: 'title',
              label: 'Exam Title',
              placeholder: 'Enter exam title'
            }}
          />

          <CustomForm.Select
            field={{
              name: 'class_id',
              label: 'Class',
              placeholder: 'Select class',
              options: classOptions
            }}
          />

          <CustomForm.Select
            field={{
              name: 'subject_id',
              label: 'Subject',
              placeholder: 'Select subject',
              options: subjectOptions
            }}
          />

          <CustomForm.Input
            field={{
              name: 'total_marks',
              label: 'Total Marks',
              placeholder: 'Enter total marks'
            }}
          />

          <CustomForm.Input
            field={{
              name: 'pass_marks',
              label: 'Pass Marks',
              placeholder: 'Enter pass marks'
            }}
          />

          <CustomForm.Input
            field={{
              name: 'duration',
              label: 'Duration (minutes)',
              placeholder: 'Enter duration in minutes'
            }}
          />

          <CustomForm.DatePicker
            field={{
              name: 'exam_date',
              label: 'Exam Date'
            }}
          />

          <CustomForm.TimePicker
            field={{
              name: 'start_time',
              label: 'Start Time'
            }}
          />

          <CustomForm.Textarea
            field={{
              name: 'description',
              label: 'Description',
              placeholder: 'Enter exam description'
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Exam Sections</h3>
            <p className="text-muted-foreground text-sm">
              Divide your exam into sections for better organization
            </p>
          </div>
          <Button type="button" onClick={addSection} disabled={isPending}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
        <Separator className="my-4" />

        {fields.map((field, index) => (
          <div key={field.id} className="mb-6 rounded-md border p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium">Section {index + 1}</h4>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <CustomForm.Input
                field={{
                  name: `sections.${index}.section_number`,
                  label: 'Section Number'
                }}
              />
              <CustomForm.Input
                field={{
                  name: `sections.${index}.section_title`,
                  label: 'Section Title',
                  placeholder: 'Enter section title'
                }}
              />

              <CustomForm.Select
                field={{
                  name: `sections.${index}.question_type`,
                  label: 'Question Type',
                  placeholder: 'Select question type',
                  options: [
                    {
                      label: 'Multiple Choice',
                      value: QuestionType.MULTIPLE_CHOICE
                    },
                    {
                      label: 'True/False',
                      value: QuestionType.TRUE_FALSE
                    },
                    {
                      label: 'Matching',
                      value: QuestionType.MATCHING
                    },
                    {
                      label: 'Fill in the Blank',
                      value: QuestionType.FILL_IN_BLANK
                    },
                    {
                      label: 'Short Answer',
                      value: QuestionType.SHORT_ANSWER
                    },
                    {
                      label: 'Long Answer',
                      value: QuestionType.LONG_ANSWER
                    },
                    {
                      label: 'Ordering',
                      value: QuestionType.ORDERING
                    },
                    {
                      label: 'Essay',
                      value: QuestionType.ESSAY
                    }
                  ]
                }}
              />

              <div className="sm:col-span-2">
                <CustomForm.Textarea
                  field={{
                    name: `sections.${index}.section_description`,
                    label: 'Section Description',
                    placeholder: 'Enter section description (optional)'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <CustomForm.Button type="submit" state={isPending ? 'loading' : 'default'}>
          {isPending ? 'Creating Exam...' : 'Create Exam'}
        </CustomForm.Button>
      </div>
    </CustomForm>
  );
};
