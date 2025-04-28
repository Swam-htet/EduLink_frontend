import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  ExamAnswer,
  ExamData,
  ExamQuestion,
  QuestionType
} from '@/modules/Student/Exam/types/exam.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, FieldError, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

interface ExamFormProps {
  examData: ExamData;
  onSubmit: (answers: ExamAnswer[]) => void;
  submitting?: boolean;
}

const answerSchema = z.object({
  question_id: z.number(),
  section_id: z.number(),
  type: z
    .enum([
      'multiple_choice',
      'true_false',
      'fill_in_blank',
      'short_answer',
      'long_answer',
      'matching',
      'ordering',
      'essay'
    ])
    .nullable(),
  answer: z
    .record(
      z.string(),
      z.union([
        z.string(),
        z.array(z.string()),
        z.array(
          z.object({
            question: z.string(),
            answer: z.string()
          })
        )
      ])
    )
    .nullable()
});

const formSchema = z.object({
  answers: z.array(answerSchema)
});

type FormValues = z.infer<typeof formSchema>;

interface MatchingPair {
  question: string;
  answer: string;
}

interface AnswerFieldValue {
  [key: string]: string | string[] | MatchingPair[];
}

export function ExamForm({ examData, onSubmit, submitting = false }: ExamFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: examData.sections.flatMap((section) =>
        section.questions.map((question) => ({
          question_id: question.id,
          section_id: section.id,
          type: question.type,
          answer: null
        }))
      )
    }
  });

  const { fields, update } = useFieldArray({
    control: form.control,
    name: 'answers'
  });

  const handleAnswerChange = (
    questionId: number,
    sectionId: number,
    type: QuestionType,
    value: string | string[] | MatchingPair[]
  ) => {
    const answerIndex = fields.findIndex(
      (field) => field.question_id === questionId && field.section_id === sectionId
    );

    if (answerIndex !== -1) {
      let formattedValue: string | string[] | MatchingPair[] = value;

      // Format matching answers to ensure proper structure
      if (type === 'matching' && Array.isArray(value)) {
        formattedValue = value
          .filter((pair): pair is MatchingPair => {
            return typeof pair === 'object' && 'question' in pair && 'answer' in pair;
          })
          .map((pair) => ({
            question: pair.question,
            answer: pair.answer
          }));
      }

      update(answerIndex, {
        question_id: questionId,
        section_id: sectionId,
        type,
        answer: formattedValue ? { [type]: formattedValue } : null
      });
    }
  };

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setCurrentSection((prev) => Math.min(examData.sections.length - 1, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const formData = form.getValues();
      const typedAnswers: ExamAnswer[] = formData.answers.map((answer) => ({
        ...answer,
        type: answer.type as QuestionType | null
      }));
      onSubmit(typedAnswers);
    }
  };

  const renderAnswerPreview = (answer: ExamAnswer) => {
    const question = examData.sections
      .find((s) => s.id === answer.section_id)
      ?.questions.find((q) => q.id === answer.question_id);

    if (!question) return null;

    let previewContent: React.ReactNode = null;

    if (!answer.answer) {
      return (
        <div className="space-y-2">
          <h4 className="font-medium">{question.question}</h4>
          <div className="text-sm text-gray-600">
            <p>
              Answer: <span className="text-red-500">Blank</span>
            </p>
            {question.type === 'matching' && question.matching_pairs && (
              <div className="mt-2">
                <p className="font-medium">Matching Pairs:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Questions:</p>
                    <ul className="list-disc pl-4">
                      {question.matching_pairs.questions.map((q) => (
                        <li key={q.id}>{q.text}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Answers:</p>
                    <ul className="list-disc pl-4">
                      {question.matching_pairs.answers.map((a) => (
                        <li key={a.id}>{a.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {question.type === 'ordering' && question.options && (
              <div className="mt-2">
                <p className="font-medium">Items to Order:</p>
                <ul className="list-disc pl-4">
                  {question.options.map((option) => (
                    <li key={option.id}>{option.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }

    const answerValue = answer.answer[question.type];
    if (!answerValue) return null;

    switch (question.type) {
      case 'multiple_choice':
      case 'true_false':
        previewContent = <p>Answer: {answerValue as string}</p>;
        break;
      case 'fill_in_blank':
      case 'short_answer':
      case 'long_answer':
      case 'essay':
        previewContent = <p>Answer: {answerValue as string}</p>;
        break;
      case 'matching': {
        const matchingPairs = answerValue as MatchingPair[];
        previewContent = (
          <div>
            {matchingPairs.map((match) => (
              <p key={match.question}>
                {match.question} → {match.answer}
              </p>
            ))}
          </div>
        );
        break;
      }
      case 'ordering': {
        const orderedItems = answerValue as string[];
        previewContent = (
          <div>
            {orderedItems.map((item, index) => (
              <p key={index}>
                Position {index + 1}: {item}
              </p>
            ))}
          </div>
        );
        break;
      }
      default:
        previewContent = null;
    }

    return (
      <div className="space-y-2">
        <h4 className="font-medium">{question.question}</h4>
        <div className="text-sm text-gray-600">{previewContent}</div>
      </div>
    );
  };

  const renderQuestion = (question: ExamQuestion, sectionId: number) => {
    const errors = form.formState.errors.answers;
    let error: FieldError | undefined;

    if (errors && Array.isArray(errors)) {
      for (const err of errors) {
        if (!err) continue;
        const typedError = err as FieldError & { question_id?: number; section_id?: number };
        if (typedError.question_id === question.id && typedError.section_id === sectionId) {
          error = err;
          break;
        }
      }
    }

    const answerIndex = fields.findIndex(
      (field) => field.question_id === question.id && field.section_id === sectionId
    );

    return (
      <div className="space-y-2">
        {error && <div className="text-red-500">{error.message}</div>}
        {(() => {
          switch (question.type) {
            case 'multiple_choice':
              return (
                <Controller<FormValues, `answers.${number}.answer`>
                  name={`answers.${answerIndex}.answer`}
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange({ [question.type]: value });
                        handleAnswerChange(question.id, sectionId, question.type, value);
                      }}
                      value={((field.value as AnswerFieldValue)?.[question.type] as string) || ''}
                    >
                      {question.options?.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                          <Label htmlFor={`${question.id}-${option.id}`}>{option.text}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              );

            case 'true_false':
              return (
                <Controller<FormValues, `answers.${number}.answer`>
                  name={`answers.${answerIndex}.answer`}
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange({ [question.type]: value });
                        handleAnswerChange(question.id, sectionId, question.type, value);
                      }}
                      value={((field.value as AnswerFieldValue)?.[question.type] as string) || ''}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id={`${question.id}-true`} />
                        <Label htmlFor={`${question.id}-true`}>True</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id={`${question.id}-false`} />
                        <Label htmlFor={`${question.id}-false`}>False</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              );

            case 'fill_in_blank':
              return (
                <Controller<FormValues, `answers.${number}.answer`>
                  name={`answers.${answerIndex}.answer`}
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter your answer"
                      onChange={(e) => {
                        const value = [e.target.value];
                        field.onChange({ [question.type]: value });
                        handleAnswerChange(question.id, sectionId, question.type, value);
                      }}
                      value={
                        ((field.value as AnswerFieldValue)?.[question.type] as string[])?.[0] || ''
                      }
                    />
                  )}
                />
              );

            case 'short_answer':
            case 'long_answer':
            case 'essay':
              return (
                <Controller<FormValues, `answers.${number}.answer`>
                  name={`answers.${answerIndex}.answer`}
                  control={form.control}
                  render={({ field }) => (
                    <Textarea
                      placeholder={`Enter your ${question.type.replace('_', ' ')}`}
                      className={question.type === 'essay' ? 'min-h-[200px]' : 'min-h-[100px]'}
                      onChange={(e) => {
                        field.onChange({ [question.type]: e.target.value });
                        handleAnswerChange(question.id, sectionId, question.type, e.target.value);
                      }}
                      value={((field.value as AnswerFieldValue)?.[question.type] as string) || ''}
                    />
                  )}
                />
              );

            case 'matching':
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="mb-2 font-medium">Questions:</h5>
                      <ul className="space-y-2">
                        {question.matching_pairs?.questions.map((q) => (
                          <li key={q.id} className="flex items-center space-x-2">
                            <span className="font-medium">{q.id}:</span>
                            <span>{q.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="mb-2 font-medium">Answers:</h5>
                      <ul className="space-y-2">
                        {question.matching_pairs?.answers.map((a) => (
                          <li key={a.id} className="flex items-center space-x-2">
                            <span className="font-medium">{a.id}:</span>
                            <span>{a.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="mb-2 font-medium">Your Matches:</h5>
                    {question.matching_pairs?.questions.map((q) => {
                      const currentAnswers =
                        (fields[answerIndex]?.answer?.[question.type] as MatchingPair[]) || [];
                      const currentMatch = currentAnswers.find((m) => m.question === q.id);

                      return (
                        <div key={q.id} className="mb-2 flex items-center space-x-4">
                          <span className="w-24">{q.text}</span>
                          <Input
                            placeholder="Enter matching answer ID"
                            onChange={(e) => {
                              const matchingAnswer = {
                                question: q.id,
                                answer: e.target.value
                              };
                              const updatedAnswers = [
                                ...currentAnswers.filter((m) => m.question !== q.id),
                                matchingAnswer
                              ];
                              handleAnswerChange(
                                question.id,
                                sectionId,
                                question.type,
                                updatedAnswers
                              );
                            }}
                            value={currentMatch?.answer || ''}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );

            case 'ordering':
              return (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h5 className="mb-2 font-medium">Items to Order:</h5>
                    <ul className="space-y-2">
                      {question.options?.map((option) => (
                        <li key={option.id} className="flex items-center space-x-2">
                          <span className="font-medium">{option.id}:</span>
                          <span>{option.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="mb-2 font-medium">Enter the correct order (use item IDs):</h5>
                    {question.options?.map((option) => {
                      const currentOrder =
                        (fields[answerIndex]?.answer?.[question.type] as string[]) || [];

                      return (
                        <div key={option.id} className="mb-2 flex items-center space-x-4">
                          <span className="w-24">Position {option.id}:</span>
                          <Input
                            placeholder={`Enter item ID for position ${option.id}`}
                            onChange={(e) => {
                              const position = Number(option.id) - 1;
                              const updatedOrder = [...currentOrder];
                              updatedOrder[position] = e.target.value;
                              handleAnswerChange(
                                question.id,
                                sectionId,
                                question.type,
                                updatedOrder
                              );
                            }}
                            value={currentOrder[Number(option.id) - 1] || ''}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-8">
        {/* Exam Header */}
        <div className="mb-8 rounded-lg bg-gray-50 p-6">
          <h1 className="text-3xl font-bold text-gray-900">{examData.title}</h1>
          <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600 md:grid-cols-3">
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Class</p>
              <p>
                {examData.class.name} ({examData.class.code})
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Subject</p>
              <p>
                {examData.subject.title} ({examData.subject.code})
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Duration</p>
              <p>{examData.exam_details.duration} minutes</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Total Marks</p>
              <p>{examData.exam_details.total_marks}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Pass Marks</p>
              <p>{examData.exam_details.pass_marks}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Exam Date & Time</p>
              <p>{examData.schedule.exam_date}</p>
              <p className="text-sm">
                {examData.schedule.start_time} - {examData.schedule.end_time}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {showPreview
                ? 'Review Mode'
                : `Section ${currentSection + 1} of ${examData.sections.length}`}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {showPreview
                ? '100%'
                : `${Math.round((currentSection / examData.sections.length) * 100)}%`}{' '}
              Complete
            </span>
          </div>
          <Progress
            value={showPreview ? 100 : (currentSection / examData.sections.length) * 100}
            className="h-2"
          />
        </div>

        {showPreview ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Review Your Answers</h3>
            <div className="space-y-4">
              {fields.map((field, index) => {
                const typedField: ExamAnswer = {
                  question_id: field.question_id,
                  section_id: field.section_id,
                  type: field.type as QuestionType | null,
                  answer: field.answer
                };
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    {renderAnswerPreview(typedField)}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
                className="min-w-[120px]"
              >
                Back to Questions
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                Section {examData.sections[currentSection].section_number}:{' '}
                {examData.sections[currentSection].section_title}
              </h3>

              <div className="space-y-6">
                {examData.sections[currentSection].questions.map((question) => (
                  <div
                    key={question.id}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="mt-1 text-sm font-medium text-gray-600">
                        Q{question.id}:
                      </span>
                      <div className="flex-1">
                        <h4 className="mb-4 text-lg font-medium text-gray-900">
                          {question.question}
                        </h4>
                        {renderQuestion(question, examData.sections[currentSection].id)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="min-w-[120px]"
              >
                Previous
              </Button>

              {currentSection === examData.sections.length - 1 ? (
                <Button
                  onClick={() => setShowPreview(true)}
                  className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
                >
                  Review Answers
                </Button>
              ) : (
                <Button onClick={handleNext} className="min-w-[120px]">
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
