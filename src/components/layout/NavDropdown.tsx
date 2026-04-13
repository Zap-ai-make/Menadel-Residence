'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface NavDropdownItem {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  isActive?: boolean;
}

export function NavDropdown({ label, items, isActive }: NavDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'flex items-center gap-1 text-sm text-[var(--color-white-muted)] hover:text-white transition-colors border-b-2 border-transparent',
          isActive && 'text-white border-[var(--color-gold)]'
        )}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn(
            'transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-1.5"
      >
        <nav className="flex flex-col gap-0.5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-[var(--color-white-muted)] hover:text-white hover:bg-white/5 transition-colors group"
            >
              {item.icon && (
                <span className="text-base mt-0.5 flex-shrink-0">{item.icon}</span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-[var(--color-gold)] transition-colors">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-[var(--color-white-muted)]/70 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
}
