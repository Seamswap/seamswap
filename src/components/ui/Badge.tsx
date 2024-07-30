import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@src/lib/utils';

// Define badge variants
const badgeVariants = cva('text-sm font-medium me-2 px-2.5 py-1 rounded', {
  variants: {
    variant: {
      success: 'bg-[#E5FFF3] text-[#00B25D]',
      warning: 'bg-[#FFF5DB] text-[#FFBB0B]',
      error: 'bg-[#FFE5E5] text-[#FF2929]',
    },
  },
});

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: React.ReactNode;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ children, variant, className }) => {
  return <span className={cn(badgeVariants({ variant, className }))}>{children}</span>;
};

export default Badge;
