import { type ClassValue, clsx } from 'clsx';
import { format as dateFnsFormat, parseISO } from 'date-fns';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimString(input: string, count = 10): string {
  return input.trim().slice(0, count) + '...';
}

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price);
}

export function cleanObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
    ) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);
}

export function formatDate(date?: string) {
  if (!date) return '-';
  return dateFnsFormat(parseISO(date), 'dd/MM/yyyy');
}

export function formatTime(time?: string) {
  if (!time) return '-';
  return dateFnsFormat(parseISO(time), 'HH:mm');
}

export function goToDynamicRoute(path: string, id: string) {
  return path.replace(':id', id);
}

export const getIcon = (iconName: string): React.ForwardRefExoticComponent<LucideProps> => {
  const IconComponent = Icons[
    iconName as keyof typeof Icons
  ] as React.ForwardRefExoticComponent<LucideProps>;
  return IconComponent || Icons.Bookmark;
};
