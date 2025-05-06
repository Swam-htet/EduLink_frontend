import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  uploadQuestionsSchema,
  type UploadQuestionsFormData
} from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import { Exam, QuestionType } from '@/modules/Admin/ExamManagement/types/exam.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const defaultOptions = [
  { id: '1', text: 'Option 1' },
  { id: '2', text: 'Option 2' }
];

const defaultTrueFalseOptions = [
  { id: 'true', text: 'True' },
  { id: 'false', text: 'False' }
];

interface ExamQuestionUploadFormProps {
  exam: Exam;
  onSubmit: (data: UploadQuestionsFormData) => void;
  loading: boolean;
}

export const ExamQuestionUploadForm = ({ exam, onSubmit }: ExamQuestionUploadFormProps) => {
  const formMethods = useForm<UploadQuestionsFormData>({
    resolver: zodResolver(uploadQuestionsSchema),
    defaultValues: {
      exam_questions:
        exam.sections?.map((section) => ({
          id: uuidv4(),
          section_id: section.id,
          question: `Default question for ${section.section_title}`,
          type: section.question_type,
          marks: '1',
          difficulty_level: '1',
          options:
            section.question_type === QuestionType.MULTIPLE_CHOICE
              ? defaultOptions
              : section.question_type === QuestionType.TRUE_FALSE
                ? defaultTrueFalseOptions
                : [],
          requires_manual_grading: false,
          correct_answer: section.question_type === QuestionType.TRUE_FALSE ? 'true' : '1',
          explanation: 'This is a default question. Please edit it as needed.',
          time_limit: '5'
        })) || []
    }
  });

  // form error
  const { errors } = formMethods.formState;
  console.log(errors);

  const { fields, remove } = useFieldArray({
    control: formMethods.control,
    name: 'exam_questions'
  });

  const addQuestion = (sectionId: number, questionType: QuestionType) => {
    const questionId = uuidv4();
    const newQuestion = {
      id: questionId,
      section_id: sectionId,
      question: '',
      type: questionType,
      marks: '1',
      difficulty_level: '1',
      options:
        questionType === QuestionType.MULTIPLE_CHOICE
          ? defaultOptions
          : questionType === QuestionType.TRUE_FALSE
            ? defaultTrueFalseOptions
            : [],
      requires_manual_grading: false,
      correct_answer: '1'
    };

    const currentQuestions = formMethods.getValues('exam_questions') || [];
    const updatedQuestions = [...currentQuestions, newQuestion];
    formMethods.setValue('exam_questions', updatedQuestions);
  };

  const handleSubmit = (data: UploadQuestionsFormData) => {
    console.log(data);
    onSubmit(data);
  };

  const renderQuestionFields = (questionId: string) => {
    const questionIndex = fields.findIndex((field) => field.id === questionId);
    const questionType = formMethods.watch(`exam_questions.${questionIndex}.type`);

    switch (questionType) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <>
            <div className="space-y-4">
              <h5 className="font-medium">Options</h5>
              {formMethods
                .watch(`exam_questions.${questionIndex}.options`)
                ?.map((_, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <CustomForm.Input
                      field={{
                        name: `exam_questions.${questionIndex}.options.${optionIndex}.text`,
                        label: `Option ${optionIndex + 1}`,
                        placeholder: 'Enter option text'
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const options =
                          formMethods.getValues(`exam_questions.${questionIndex}.options`) || [];
                        formMethods.setValue(
                          `exam_questions.${questionIndex}.options`,
                          options.filter((_, i) => i !== optionIndex)
                        );
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const options =
                    formMethods.getValues(`exam_questions.${questionIndex}.options`) || [];
                  formMethods.setValue(`exam_questions.${questionIndex}.options`, [
                    ...options,
                    { id: String(options.length + 1), text: '' }
                  ]);
                }}
              >
                Add Option
              </Button>
            </div>

            <CustomForm.Select
              field={{
                name: `exam_questions.${questionIndex}.correct_answer`,
                label: 'Correct Answer',
                options:
                  formMethods.watch(`exam_questions.${questionIndex}.options`)?.map((option) => ({
                    label: option.text,
                    value: option.id
                  })) || []
              }}
            />
          </>
        );

      case QuestionType.TRUE_FALSE:
        return (
          <CustomForm.Select
            field={{
              name: `exam_questions.${questionIndex}.correct_answer`,
              label: 'Correct Answer',
              options: [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' }
              ]
            }}
          />
        );

      case QuestionType.FILL_IN_BLANK:
        return (
          <div className="space-y-4">
            <h5 className="font-medium">Blank Answers</h5>
            {formMethods
              .watch(`exam_questions.${questionIndex}.blank_answers`)
              ?.map((_, blankIndex) => (
                <div key={blankIndex} className="space-y-2">
                  <CustomForm.Input
                    field={{
                      name: `exam_questions.${questionIndex}.blank_answers.${blankIndex}.acceptable_answers.0`,
                      label: `Acceptable Answer ${blankIndex + 1}`,
                      placeholder: 'Enter acceptable answer'
                    }}
                  />
                  <CustomForm.Checkbox
                    field={{
                      name: `exam_questions.${questionIndex}.blank_answers.${blankIndex}.case_sensitive`,
                      label: 'Case Sensitive'
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const blankAnswers =
                        formMethods.getValues(`exam_questions.${questionIndex}.blank_answers`) ||
                        [];
                      formMethods.setValue(
                        `exam_questions.${questionIndex}.blank_answers`,
                        blankAnswers.filter((_, i) => i !== blankIndex)
                      );
                    }}
                  >
                    Remove Answer
                  </Button>
                </div>
              ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const blankAnswers =
                  formMethods.getValues(`exam_questions.${questionIndex}.blank_answers`) || [];
                formMethods.setValue(`exam_questions.${questionIndex}.blank_answers`, [
                  ...blankAnswers,
                  {
                    id: blankAnswers.length + 1,
                    acceptable_answers: [''],
                    case_sensitive: false
                  }
                ]);
              }}
            >
              Add Acceptable Answer
            </Button>
          </div>
        );

      case QuestionType.MATCHING:
        return (
          <div className="space-y-4">
            <h5 className="font-medium">Matching Pairs</h5>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h6 className="font-medium">Questions</h6>
                {formMethods
                  .watch(`exam_questions.${questionIndex}.matching_pairs.questions`)
                  ?.map((_, qIndex) => (
                    <div key={qIndex} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CustomForm.Input
                          field={{
                            name: `exam_questions.${questionIndex}.matching_pairs.questions.${qIndex}.text`,
                            label: `Question ${qIndex + 1}`,
                            placeholder: 'Enter question'
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const questions =
                              formMethods.getValues(
                                `exam_questions.${questionIndex}.matching_pairs.questions`
                              ) || [];
                            formMethods.setValue(
                              `exam_questions.${questionIndex}.matching_pairs.questions`,
                              questions.filter((_, i) => i !== qIndex)
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <CustomForm.Select
                        field={{
                          name: `exam_questions.${questionIndex}.matching_pairs.correct_pairs.${formMethods.watch(`exam_questions.${questionIndex}.matching_pairs.questions.${qIndex}.id`)}`,
                          label: 'Correct Answer',
                          options:
                            formMethods
                              .watch(`exam_questions.${questionIndex}.matching_pairs.answers`)
                              ?.map((answer) => ({
                                label: answer.text || `Answer ${answer.id}`,
                                value: answer.id
                              })) || []
                        }}
                      />
                    </div>
                  ))}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    const questions =
                      formMethods.getValues(
                        `exam_questions.${questionIndex}.matching_pairs.questions`
                      ) || [];
                    formMethods.setValue(
                      `exam_questions.${questionIndex}.matching_pairs.questions`,
                      [...questions, { id: `q${questions.length + 1}`, text: '' }]
                    );
                  }}
                >
                  Add Question
                </Button>
              </div>

              <div>
                <h6 className="font-medium">Answers</h6>
                {formMethods
                  .watch(`exam_questions.${questionIndex}.matching_pairs.answers`)
                  ?.map((_, aIndex) => (
                    <div key={aIndex} className="mt-2 flex items-center gap-2">
                      <CustomForm.Input
                        field={{
                          name: `exam_questions.${questionIndex}.matching_pairs.answers.${aIndex}.text`,
                          label: `Answer ${aIndex + 1}`,
                          placeholder: 'Enter answer'
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const answers =
                            formMethods.getValues(
                              `exam_questions.${questionIndex}.matching_pairs.answers`
                            ) || [];
                          formMethods.setValue(
                            `exam_questions.${questionIndex}.matching_pairs.answers`,
                            answers.filter((_, i) => i !== aIndex)
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                <Button
                  type="button"
                  className="mt-2"
                  variant="outline"
                  onClick={() => {
                    const answers =
                      formMethods.getValues(
                        `exam_questions.${questionIndex}.matching_pairs.answers`
                      ) || [];
                    formMethods.setValue(`exam_questions.${questionIndex}.matching_pairs.answers`, [
                      ...answers,
                      { id: `a${answers.length + 1}`, text: '' }
                    ]);
                  }}
                >
                  Add Answer
                </Button>
              </div>
            </div>
          </div>
        );

      case QuestionType.ORDERING:
        return (
          <div className="space-y-4">
            <h5 className="font-medium">Ordering Options</h5>
            {formMethods.watch(`exam_questions.${questionIndex}.options`)?.map((_, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <CustomForm.Input
                  field={{
                    name: `exam_questions.${questionIndex}.options.${optionIndex}.text`,
                    label: `Option ${optionIndex + 1}`,
                    placeholder: 'Enter option text'
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const options =
                      formMethods.getValues(`exam_questions.${questionIndex}.options`) || [];
                    formMethods.setValue(
                      `exam_questions.${questionIndex}.options`,
                      options.filter((_, i) => i !== optionIndex)
                    );
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const options =
                  formMethods.getValues(`exam_questions.${questionIndex}.options`) || [];
                formMethods.setValue(`exam_questions.${questionIndex}.options`, [
                  ...options,
                  { id: String(options.length + 1), text: '' }
                ]);
              }}
            >
              Add Option
            </Button>

            <div className="mt-6">
              <h5 className="font-medium">Correct Order</h5>
              <p className="text-muted-foreground mb-4 text-sm">
                Drag and drop options to set the correct order
              </p>
              <div className="space-y-2">
                {formMethods
                  .watch(`exam_questions.${questionIndex}.options`)
                  ?.map((option, orderIndex) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <span className="text-sm font-medium">{orderIndex + 1}.</span>
                      <CustomForm.Select
                        field={{
                          name: `exam_questions.${questionIndex}.correct_order.${orderIndex}`,
                          label: `Position ${orderIndex + 1}`,
                          options:
                            formMethods
                              .watch(`exam_questions.${questionIndex}.options`)
                              ?.map((opt) => ({
                                label: opt.text || `Option ${opt.id}`,
                                value: opt.id
                              })) || []
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case QuestionType.SHORT_ANSWER:
        return (
          <CustomForm.Input
            field={{
              name: `exam_questions.${questionIndex}.correct_answer`,
              label: 'Correct Answer',
              placeholder: 'Enter correct answer'
            }}
          />
        );

      case QuestionType.LONG_ANSWER:
      case QuestionType.ESSAY:
        return (
          <CustomForm.Textarea
            field={{
              name: `exam_questions.${questionIndex}.answer_guidelines`,
              label: 'Answer Guidelines',
              placeholder: 'Enter guidelines for answering this question'
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={handleSubmit} className="space-y-8">
      {/* section mapping */}
      {exam.sections?.map((section) => (
        <div key={section.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{section.section_title}</h3>

              <span className="text-sm text-gray-500">Question type - {section.question_type}</span>

              {section.section_description && (
                <p className="text-sm text-gray-500">Description - {section.section_description}</p>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => addQuestion(section.id, section.question_type)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
          <Separator />

          {/* question mapping */}
          {fields
            .filter((field) => field.section_id === section.id)
            .map((field, index) => {
              const questionIndex = fields.findIndex((f) => f.id === field.id);
              return (
                <div key={field.id} className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(questionIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <CustomForm.Input
                      field={{
                        name: `exam_questions.${questionIndex}.question`,
                        label: 'Question Text',
                        placeholder: 'Enter your question'
                      }}
                    />

                    <CustomForm.Select
                      field={{
                        name: `exam_questions.${questionIndex}.type`,
                        label: 'Question Type',
                        disabled: true,
                        options: [
                          { label: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE },
                          { label: 'True/False', value: QuestionType.TRUE_FALSE },
                          { label: 'Fill in the Blank', value: QuestionType.FILL_IN_BLANK },
                          { label: 'Short Answer', value: QuestionType.SHORT_ANSWER },
                          { label: 'Long Answer', value: QuestionType.LONG_ANSWER },
                          { label: 'Matching', value: QuestionType.MATCHING },
                          { label: 'Ordering', value: QuestionType.ORDERING },
                          { label: 'Essay', value: QuestionType.ESSAY }
                        ]
                      }}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <CustomForm.Input
                        field={{
                          name: `exam_questions.${questionIndex}.marks`,
                          label: 'Marks'
                        }}
                      />

                      <CustomForm.Input
                        field={{
                          name: `exam_questions.${questionIndex}.time_limit`,
                          label: 'Time Limit',
                          placeholder: 'Enter time limit in minutes'
                        }}
                      />

                      <CustomForm.Input
                        field={{
                          name: `exam_questions.${questionIndex}.difficulty_level`,
                          label: 'Difficulty Level',
                          placeholder: 'Enter difficulty level'
                        }}
                      />
                    </div>

                    <CustomForm.Textarea
                      field={{
                        name: `exam_questions.${questionIndex}.explanation`,
                        label: 'Explanation',
                        placeholder: 'Enter explanation for the correct answer'
                      }}
                    />

                    {/* dynamic question fields */}
                    {renderQuestionFields(field.id)}

                    <CustomForm.Checkbox
                      field={{
                        name: `exam_questions.${questionIndex}.requires_manual_grading`,
                        label: 'Requires Manual Grading'
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      ))}

      <div className="flex justify-end">
        <CustomForm.Button type="submit">Upload Questions</CustomForm.Button>
      </div>
    </CustomForm>
  );
};
