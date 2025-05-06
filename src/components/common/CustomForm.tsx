import { Button as ShadcnButton } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormDescription, FormLabel } from '@/components/ui/form';
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
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface PasswordFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface CheckFieldProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  disabled?: boolean;
  error?: string;
}

export interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface TimePickerProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: string;
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
  error?: string;
}

type CustomFormProps<T extends FieldValues> = {
  formMethods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  className?: string;
  children: React.ReactNode;
};

const FormMethodsContext = createContext<UseFormReturn<FieldValues> | null>(null);

function CustomForm<T extends FieldValues>({
  formMethods,
  onSubmit,
  className,
  children
}: CustomFormProps<T>) {
  return (
    <FormMethodsContext.Provider value={formMethods as UseFormReturn<FieldValues>}>
      <Form {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className={cn('space-y-2', className)}>
          {children}
        </form>
      </Form>
    </FormMethodsContext.Provider>
  );
}

CustomForm.Input = React.forwardRef<HTMLInputElement, { field: InputProps }>(({ field }, ref) => {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) throw new Error('Input must be used within a CustomForm');
  const { name, label, type, placeholder, disabled, required, error } = field;

  return (
    <div className="space-y-2">
      {label && (
        <FormLabel>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={formMethods.control}
        defaultValue={undefined}
        render={({ field: controllerField, fieldState }) => (
          <>
            <Input
              {...controllerField}
              ref={ref}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              className={cn(fieldState.error && 'border-red-500')}
              value={controllerField.value ?? ''}
            />
            {(fieldState.error || error) && (
              <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
            )}
          </>
        )}
      />
    </div>
  );
});

CustomForm.Input.displayName = 'CustomForm.Input';

CustomForm.Password = React.forwardRef<HTMLInputElement, { field: PasswordFieldProps }>(
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) throw new Error('Password must be used within a CustomForm');
    const [showPassword, setShowPassword] = useState(false);
    const { name, label, placeholder, disabled, required, error } = field;

    return (
      <div className="space-y-2">
        {label && <FormLabel>{label}</FormLabel>}
        <Controller
          name={name}
          control={formMethods.control}
          render={({ field: controllerField, fieldState }) => (
            <>
              <div className="relative">
                <Input
                  {...controllerField}
                  ref={ref}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={placeholder}
                  disabled={disabled}
                  required={required}
                  className={cn(fieldState.error && 'border-red-500')}
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
              {(fieldState.error || error) && (
                <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
              )}
            </>
          )}
        />
      </div>
    );
  }
);

CustomForm.Password.displayName = 'CustomForm.Password';

CustomForm.Checkbox = React.forwardRef<
  HTMLInputElement | HTMLButtonElement,
  { field: CheckFieldProps }
>(({ field }, ref) => {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) throw new Error('Checkbox must be used within a CustomForm');
  const { name, label, description, disabled, required, error } = field;

  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={formMethods.control}
        render={({ field: controllerField, fieldState }) => (
          <>
            <div className="flex items-center gap-2">
              <Checkbox
                ref={ref as React.LegacyRef<HTMLButtonElement>}
                checked={controllerField.value}
                onCheckedChange={controllerField.onChange}
                disabled={disabled}
                required={required}
              />
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
                {description && <FormDescription>{description}</FormDescription>}
              </div>
            </div>
            {(fieldState.error || error) && (
              <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
            )}
          </>
        )}
      />
    </div>
  );
});

CustomForm.Checkbox.displayName = 'CustomForm.Checkbox';

CustomForm.Select = React.forwardRef<HTMLSelectElement, { field: SelectProps }>(({ field }) => {
  const formMethods = useContext(FormMethodsContext);
  if (!formMethods) throw new Error('Select must be used within a CustomForm');
  const { name, label, placeholder, description, options, disabled, error } = field;

  return (
    <div className="space-y-2">
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={formMethods.control}
        defaultValue={undefined}
        render={({ field: controllerField, fieldState }) => (
          <>
            <Select
              onValueChange={controllerField.onChange}
              value={controllerField.value ?? ''}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            {(fieldState.error || error) && (
              <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
            )}
          </>
        )}
      />
    </div>
  );
});

CustomForm.Select.displayName = 'CustomForm.Select';

CustomForm.Textarea = React.forwardRef<HTMLTextAreaElement, { field: TextareaProps }>(
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) throw new Error('Textarea must be used within a CustomForm');
    const { name, label, placeholder, description, disabled, required, error } = field;

    return (
      <div className="space-y-2">
        {label && <FormLabel>{label}</FormLabel>}
        <Controller
          name={name}
          control={formMethods.control}
          render={({ field: controllerField, fieldState }) => (
            <>
              <Textarea
                {...controllerField}
                ref={ref}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={cn(fieldState.error && 'border-red-500')}
              />
              {description && <FormDescription>{description}</FormDescription>}
              {(fieldState.error || error) && (
                <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
              )}
            </>
          )}
        />
      </div>
    );
  }
);

CustomForm.Textarea.displayName = 'CustomForm.Textarea';

CustomForm.DatePicker = React.forwardRef<HTMLInputElement, { field: DatePickerProps }>(
  ({ field }) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) throw new Error('DatePicker must be used within a CustomForm');
    const { name, label, placeholder, description, disabled, error } = field;

    return (
      <div className="space-y-2">
        {label && <FormLabel>{label}</FormLabel>}
        <Controller
          name={name}
          control={formMethods.control}
          defaultValue={undefined}
          render={({ field: controllerField, fieldState }) => (
            <>
              <Popover>
                <PopoverTrigger>
                  <ShadcnButton
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !controllerField.value && 'text-muted-foreground',
                      fieldState.error && 'border-red-500'
                    )}
                    disabled={disabled}
                  >
                    {controllerField.value ? (
                      format(new Date(controllerField.value), 'PPP')
                    ) : (
                      <span>{placeholder || 'Pick a date'}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </ShadcnButton>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={controllerField.value ? new Date(controllerField.value) : undefined}
                    onSelect={(date) => {
                      controllerField.onChange(date ? format(date, 'yyyy-MM-dd') : undefined);
                    }}
                    disabled={(date) => disabled || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {description && <FormDescription>{description}</FormDescription>}
              {(fieldState.error || error) && (
                <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
              )}
            </>
          )}
        />
      </div>
    );
  }
);

CustomForm.DatePicker.displayName = 'CustomForm.DatePicker';

CustomForm.TimePicker = React.forwardRef<HTMLInputElement, { field: TimePickerProps }>(
  ({ field }, ref) => {
    const formMethods = useContext(FormMethodsContext);
    if (!formMethods) throw new Error('TimePicker must be used within a CustomForm');
    const { name, label, description, disabled, placeholder, error } = field;

    return (
      <div className="space-y-2">
        {label && <FormLabel>{label}</FormLabel>}
        <Controller
          name={name}
          control={formMethods.control}
          defaultValue={undefined}
          render={({ field: controllerField, fieldState }) => (
            <>
              <Popover>
                <PopoverTrigger>
                  <ShadcnButton
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !controllerField.value && 'text-muted-foreground',
                      fieldState.error && 'border-red-500'
                    )}
                    disabled={disabled}
                  >
                    {controllerField.value || <span>{placeholder || 'Pick a time'}</span>}
                    <Clock className="ml-auto h-4 w-4 opacity-50" />
                  </ShadcnButton>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      ref={ref}
                      value={controllerField.value ?? ''}
                      className="w-full"
                      disabled={disabled}
                      onChange={(e) => {
                        controllerField.onChange(e.target.value || undefined);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {description && <FormDescription>{description}</FormDescription>}
              {(fieldState.error || error) && (
                <p className="text-sm text-red-500">{fieldState.error?.message || error}</p>
              )}
            </>
          )}
        />
      </div>
    );
  }
);

CustomForm.TimePicker.displayName = 'CustomForm.TimePicker';

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
  if (!formMethods) throw new Error('Button must be used within a CustomForm');

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
