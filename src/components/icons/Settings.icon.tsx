import * as React from 'react';

type ISettings = React.SVGAttributes<SVGElement>;

const Settings: React.FC<ISettings> = props => {
  return (<svg width="24" height="25" {...props} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 9.60998V15.38C3 17.5 3 17.5 5 18.85L10.5 22.03C11.33 22.51 12.68 22.51 13.5 22.03L19 18.85C21 17.5 21 17.5 21 15.39V9.60998C21 7.49998 21 7.49999 19 6.14999L13.5 2.96999C12.68 2.48999 11.33 2.48999 10.5 2.96999L5 6.14999C3 7.49999 3 7.49998 3 9.60998Z"
        stroke="#878787" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5Z"
        stroke="#878787" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};
export default Settings;
