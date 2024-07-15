import * as React from 'react';
import { cn } from '@src/lib/utils';


export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FC<IInputProps> = ({ className, placeholder, ...props }) => {
  return <input {...props} placeholder={placeholder || '0.0'}
                className={cn('border-primary pl-4 rounded-xl py-2 flex w-full rounded-md border bg-white text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[300px]', className)} />;
};
export default Input;
