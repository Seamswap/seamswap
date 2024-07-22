import * as React from 'react';

type IExport = React.SVGAttributes<SVGElement>;

const Export: React.FC<IExport> = props => {
  return (
    <svg width="20" height="20" {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.833 9.16666L17.6663 2.33333" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" />
      <path d="M18.333 5.66667V1.66667H14.333" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M9.16699 1.66667H7.50033C3.33366 1.66667 1.66699 3.33334 1.66699 7.50001V12.5C1.66699 16.6667 3.33366 18.3333 7.50033 18.3333H12.5003C16.667 18.3333 18.3337 16.6667 18.3337 12.5V10.8333"
        stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default Export;
