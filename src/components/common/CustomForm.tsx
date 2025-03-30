import { Button as ShadcnButton } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Calendar } from '@/components/ui/calendar';
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
import { Calendar as CalendarIcon, Clock, Eye, EyeOff } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

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

type CustomFormProps<T extends FieldValues> = {
  formMethods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  className?: string;
  children: React.ReactNode;
};

// form methods context
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
          {field.label && <FormLabel>{field.label}</FormLabel>}
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
        <FormItem>
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
CustomForm.Select = React.forwardRef<HTMLSelectElement, { field: SelectProps }>(
  ({ field }, ref) => {
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
              <Select onValueChange={formField.onChange} defaultValue={formField.value}>
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
  }
);

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
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) {
      throw new Error('DatePicker must be used within a CustomForm');
    }

    return (
      <FormField
        control={formMethods.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            {field.label && <FormLabel>{field.label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <ShadcnButton
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !formField.value && 'text-muted-foreground'
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
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formField.value ? new Date(formField.value) : undefined}
                  onSelect={(date) => {
                    formField.onChange(date?.toISOString() || '');
                  }}
                  disabled={(date) =>
                    field.disabled || date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
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

    return (
      <FormField
        control={formMethods.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem className="flex flex-col">
            {field.label && <FormLabel>{field.label}</FormLabel>}
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <ShadcnButton
                    variant="ghost"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !formField.value && 'text-muted-foreground'
                    )}
                  >
                    {formField.value || <span>Pick a time</span>}
                    <Clock className="ml-auto h-4 w-4 opacity-50" />
                  </ShadcnButton>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-4" align="start">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={formField.value}
                      onChange={(e) => formField.onChange(e.target.value)}
                      className="w-[120px]"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {field.description && <FormDescription>{field.description}</FormDescription>}
              <FormMessage />
            </FormControl>
          </FormItem>
        )}
      />
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
