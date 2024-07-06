import * as React from 'react';

type ISwapIcon = React.SVGAttributes<SVGElement>;

const SwapIcon: React.FC<ISwapIcon> = props => {
  return (<svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.01001 20.5L3.99001 15.49" stroke="#00B8A1" strokeWidth="1.5" strokeMiterlimit="10"
            strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.01001 3.5L9.01001 20.5" stroke="#00B8A1" strokeWidth="1.5" strokeMiterlimit="10"
            strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.99 3.5L20.01 8.51" stroke="#00B8A1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
            strokeLinejoin="round" />
      <path d="M14.99 20.5L14.99 3.5" stroke="#00B8A1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
  );
};
export default SwapIcon;
