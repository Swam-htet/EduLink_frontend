import { Button as ShadcnButton } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Eye, EyeOff } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';
import { FieldValues, useController, UseFormReturn } from 'react-hook-form';

export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface PasswordFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface CheckFieldProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  disabled?: boolean;
}

export interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface TimePickerProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  state?: 'loading' | 'default';
  className?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface DateRangePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

type CustomFormProps<T extends FieldValues> = {
  formMethods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  className?: string;
  children: React.ReactNode;
};

// form methods context
// ignore type error for now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormMethodsContext = createContext<UseFormReturn<any> | null>(null);

// custom form component
function CustomForm<T extends FieldValues>({
  formMethods,
  onSubmit,
  className,
  children
}: CustomFormProps<T>) {
  return (
    <FormMethodsContext.Provider value={formMethods}>
      <Form {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className={cn('space-y-2', className)}>
          {children}
        </form>
      </Form>
    </FormMethodsContext.Provider>
  );
}

// input field component
CustomForm.Input = React.forwardRef<HTMLInputElement, { field: InputProps }>(({ field }, ref) => {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Input must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          {field.label && (
            <FormLabel>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...formField}
              ref={ref}
              type={field.type}
              placeholder={field.placeholder}
              disabled={field.disabled}
              required={field.required}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

CustomForm.Input.displayName = 'CustomForm.Input';

// password field component
CustomForm.Password = React.forwardRef<HTMLInputElement, { field: PasswordFieldProps }>(
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) {
      throw new Error('Password must be used within a CustomForm');
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormField
        control={formMethods.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            {field.label && <FormLabel>{field.label}</FormLabel>}
            <FormControl>
              <div className="relative">
                <Input
                  {...formField}
                  ref={ref}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  required={field.required}
                  className="pr-10"
                />
                <ShadcnButton
                  className="absolute right-0 bottom-0"
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </ShadcnButton>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

CustomForm.Password.displayName = 'CustomForm.Password';

// checkbox component
CustomForm.Checkbox = React.forwardRef<
  HTMLInputElement | HTMLButtonElement,
  { field: CheckFieldProps }
>(({ field }, ref) => {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Checkbox must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className="flex items-center gap-2">
          <FormControl>
            <Checkbox
              ref={ref as React.LegacyRef<HTMLButtonElement>}
              checked={formField.value}
              onCheckedChange={formField.onChange}
              disabled={field.disabled}
              required={field.required}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{field.label}</FormLabel>
            {field.description && <FormDescription>{field.description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
});

CustomForm.Checkbox.displayName = 'CustomForm.Checkbox';

// select component
CustomForm.Select = React.forwardRef<HTMLSelectElement, { field: SelectProps }>(({ field }) => {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Select must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={formField.onChange}
              defaultValue={formField.value}
              disabled={field.disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {field.description && <FormDescription>{field.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

CustomForm.Select.displayName = 'CustomForm.Select';

// textarea component
CustomForm.Textarea = React.forwardRef<HTMLTextAreaElement, { field: TextareaProps }>(
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) {
      throw new Error('Textarea must be used within a CustomForm');
    }

    return (
      <FormField
        control={formMethods.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            {field.label && <FormLabel>{field.label}</FormLabel>}
            <FormControl>
              <Textarea
                {...formField}
                ref={ref}
                placeholder={field.placeholder}
                disabled={field.disabled}
                required={field.required}
              />
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

CustomForm.Textarea.displayName = 'CustomForm.Textarea';

// date picker component
CustomForm.DatePicker = React.forwardRef<HTMLInputElement, { field: DatePickerProps }>(
  ({ field }) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) {
      throw new Error('DatePicker must be used within a CustomForm');
    }

    const { field: formField } = useController({
      control: formMethods.control,
      name: field.name
    });

    return (
      <div className="flex flex-col gap-2">
        {field.label && <FormLabel>{field.label}</FormLabel>}
        <Popover>
          <PopoverTrigger>
            <ShadcnButton
              type="button"
              variant="outline"
              className={cn(
                'w-full pl-3 text-left font-normal',
                !formField.value && 'text-muted-foreground',
                formMethods.formState.errors[field.name] && 'border-red-500'
              )}
              disabled={field.disabled}
            >
              {formField.value ? (
                format(new Date(formField.value), 'PPP')
              ) : (
                <span>{field.placeholder || 'Pick a date'}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </ShadcnButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formField.value ? new Date(formField.value) : undefined}
              onSelect={(date) => {
                formField.onChange(date ? date.toISOString() : null);
              }}
              disabled={(date) => field.disabled || date < new Date('1900-01-01')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {field.description && <FormDescription>{field.description}</FormDescription>}
        <FormMessage className="text-red-500">
          {formMethods.formState.errors[field.name]?.message as string}
        </FormMessage>
      </div>
    );
  }
);

CustomForm.DatePicker.displayName = 'CustomForm.DatePicker';

// time picker component
CustomForm.TimePicker = React.forwardRef<HTMLInputElement, { field: TimePickerProps }>(
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) {
      throw new Error('TimePicker must be used within a CustomForm');
    }

    const { field: formField } = useController({
      control: formMethods.control,
      name: field.name
    });

    return (
      <div className="flex flex-col gap-2">
        {field.label && <FormLabel>{field.label}</FormLabel>}
        <Popover>
          <PopoverTrigger>
            <FormControl>
              <ShadcnButton
                type="button"
                variant="outline"
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !formField.value && 'text-muted-foreground',
                  formMethods.formState.errors[field.name] && 'border-red-500'
                )}
                disabled={field.disabled}
              >
                {formField.value || <span>{field.placeholder || 'Pick a time'}</span>}
                <Clock className="ml-auto h-4 w-4 opacity-50" />
              </ShadcnButton>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <div className="flex items-center space-x-2">
              <Input
                type="time"
                ref={ref}
                value={formField.value || ''}
                className="w-full"
                disabled={field.disabled}
                onChange={(e) => {
                  formField.onChange(e.target.value);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        {field.description && <FormDescription>{field.description}</FormDescription>}
      </div>
    );
  }
);

CustomForm.TimePicker.displayName = 'CustomForm.TimePicker';

// button component
CustomForm.Button = function Button({
  children,
  state = 'default',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  state?: 'loading' | 'default';
  className?: string;
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Button must be used within a CustomForm');
  }

  return (
    <ShadcnButton
      {...props}
      variant="default"
      disabled={state === 'loading' || props.disabled}
      className={className}
      type="submit"
    >
      {state === 'loading' ? (
        <div className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          {children}
        </div>
      ) : (
        children
      )}
    </ShadcnButton>
  );
};

export default CustomForm;
