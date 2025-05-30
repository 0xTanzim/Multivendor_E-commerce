'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

// Create a context to share the active tab value
const TabsContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: '',
  onValueChange: () => {},
});

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
  }
>(
  (
    {
      className,
      value: controlledValue,
      onValueChange,
      defaultValue,
      children,
      ...props
    },
    ref
  ) => {
    // Support both controlled and uncontrolled mode
    const [value, setValue] = useState<string>(
      controlledValue || defaultValue || ''
    );

    // Update internal state when controlled value changes
    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
        <div
          ref={ref}
          className={cn('inline-flex w-full flex-col', className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
  }
>(({ className, value, ...props }, ref) => {
  const context = useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      ref={ref}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        className
      )}
      onClick={() => context.onValueChange(value)}
      type="button"
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className, value, children, ...props }, ref) => {
  const context = useContext(TabsContext);
  const isSelected = context.value === value;

  // Only render content if tab is selected
  if (!isSelected) return null;

  return (
    <div
      ref={ref}
      data-state={isSelected ? 'active' : 'inactive'}
      data-value={value}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, TabsList, TabsTrigger };
