'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    // If asChild is true, render the child directly with appropriate props
    const Comp = asChild ? (
      React.cloneElement(props.children as React.ReactElement, {
        className: cn(getButtonStyles(variant, size), className),
        ...props,
        ref,
      })
    ) : (
      <button
        className={cn(getButtonStyles(variant, size), className)}
        ref={ref}
        {...props}
      />
    );

    return asChild ? (
      Comp
    ) : (
      <button
        className={cn(getButtonStyles(variant, size), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Helper function to get button styles based on variant and size
function getButtonStyles(
  variant: ButtonProps['variant'],
  size: ButtonProps['size']
) {
  // Base styles for all buttons
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  // Variant-specific styles
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  // Size-specific styles
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return `${baseStyles} ${variantStyles[variant || 'default']} ${sizeStyles[size || 'default']}`;
}

export { Button };
