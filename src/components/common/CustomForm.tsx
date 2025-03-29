import { Button as CustomButton } from '@/components/ui/button';
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
import { cn } from '@/shared/utils/utils';
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
CustomForm.Input = function InputComponent({ field }: { field: InputProps }) {
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
};

// password field component
CustomForm.Password = function PasswordComponent({
  field,
  className
}: {
  field: PasswordFieldProps;
  className?: string;
}) {
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
        <FormItem className={className}>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                {...formField}
                type={showPassword ? 'text' : 'password'}
                placeholder={field.placeholder}
                disabled={field.disabled}
                required={field.required}
                className="pr-10"
              />
              <CustomButton
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </CustomButton>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// checkbox component
CustomForm.Checkbox = function CheckboxComponent({
  name,
  label,
  description
}: {
  name: string;
  label: string;
  description?: string;
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Checkbox must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

// select component
CustomForm.Select = function SelectComponent({
  name,
  label,
  placeholder = 'Select an option',
  description,
  options
}: {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Select must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// textarea component
CustomForm.Textarea = function TextareaComponent({
  name,
  label,
  placeholder,
  description
}: {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Textarea must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// date picker component
CustomForm.DatePicker = function DatePickerComponent({
  name,
  label,
  description
}: {
  name: string;
  label: string;
  description?: string;
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('DatePicker must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <CustomButton
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </CustomButton>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// time picker component
CustomForm.TimePicker = function TimePickerComponent({
  name,
  label,
  description
}: {
  name: string;
  label: string;
  description?: string;
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('TimePicker must be used within a CustomForm');
  }

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <CustomButton
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value || <span>Pick a time</span>}
                  <Clock className="ml-auto h-4 w-4 opacity-50" />
                </CustomButton>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
              <div className="flex items-center space-x-2">
                <Input
                  type="time"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-[120px]"
                />
              </div>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

CustomForm.Button = function Button({
  children,
  state = 'default',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  state?: 'loading' | 'default';
}) {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) {
    throw new Error('Button must be used within a CustomForm');
  }

  return (
    <CustomButton {...props} disabled={state === 'loading' || props.disabled}>
      {state === 'loading' ? (
        <div className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          {children}
        </div>
      ) : (
        children
      )}
    </CustomButton>
  );
};

export default CustomForm;
