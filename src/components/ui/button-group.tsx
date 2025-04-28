import { cn } from '@/lib/utils';

interface ButtonGroupItem {
  label: string;
  value: string;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ButtonGroup({ items, value, onChange, className }: ButtonGroupProps) {
  return (
    <div className={cn('inline-flex rounded-lg bg-[#F1F5F9] p-1.5', className)}>
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              'px-5 py-1.5',
              isActive ? 'rounded-md bg-white text-black' : 'text-[#64748B]'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
