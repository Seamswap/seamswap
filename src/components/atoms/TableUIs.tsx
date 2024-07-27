import * as React from 'react';

export const TableButton = ({
  text,
  ...props
}: { text: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="py-2 px-3 bg-[#ccfff8] rounded-[10px] inline-flex text-[#00b7a1] text-xs font-medium"
    {...props}
  >
    {text}
  </button>
);
