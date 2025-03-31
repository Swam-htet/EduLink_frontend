import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { ClassFilterParams } from '@/modules/ClassManagement/types/class.types';
import { ClassStatus } from '@/modules/ClassManagement/types/class.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const filterSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  status: z.nativeEnum(ClassStatus).optional(),
  course_id: z.number().optional(),
  subject_id: z.number().optional(),
  teacher_id: z.number().optional(),
  date_range: z
    .object({
      start: z.date(),
      end: z.date()
    })
    .optional(),
  capacity: z.array(z.enum(['available', 'full'])).optional()
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface ClassFilterProps {
  onFilterChange: (filters: ClassFilterParams) => void;
}

export const ClassFilter = ({ onFilterChange }: ClassFilterProps) => {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {}
  });

  const onSubmit = (values: FilterFormValues) => {
    // Convert Date objects to ISO strings for the API
    const formattedValues = {
      ...values,
      date_range: values.date_range
        ? {
            start: values.date_range.start.toISOString().split('T')[0],
            end: values.date_range.end.toISOString().split('T')[0]
          }
        : undefined
    };
    onFilterChange(formattedValues);
  };

  const handleReset = () => {
    form.reset();
    onFilterChange({});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="Search by name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Code</FormLabel>
                <FormControl>
                  <Input placeholder="Search by code..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ClassStatus.Scheduled}>Scheduled</SelectItem>
                    <SelectItem value={ClassStatus.Ongoing}>Ongoing</SelectItem>
                    <SelectItem value={ClassStatus.Completed}>Completed</SelectItem>
                    <SelectItem value={ClassStatus.Cancelled}>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* todo : add date range picker */}
          {/* <FormField
              control={form.control}
              name="date_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Range</FormLabel>
                  <FormControl>
                    <DatePickerWithRange value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit">Apply Filters</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
