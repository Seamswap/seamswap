import * as React from 'react';

type IWalletAdd = React.SVGAttributes<SVGElement>;

const WalletAdd: React.FC<IWalletAdd> = props => {
  return (<svg width="20" height="20" {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.7928 5.87498C14.5928 5.84164 14.3844 5.83332 14.1678 5.83332H5.83442C5.60109 5.83332 5.37609 5.84998 5.15942 5.88332C5.27609 5.64998 5.44276 5.43334 5.64276 5.23334L8.35109 2.51667C9.49276 1.38333 11.3428 1.38333 12.4844 2.51667L13.9428 3.99163C14.4761 4.51663 14.7594 5.18331 14.7928 5.87498Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.49992 15.8333C7.49992 16.4583 7.32492 17.05 7.01659 17.55C6.44159 18.5167 5.38325 19.1667 4.16659 19.1667C2.94992 19.1667 1.89159 18.5167 1.31659 17.55C1.00825 17.05 0.833252 16.4583 0.833252 15.8333C0.833252 13.9917 2.32492 12.5 4.16659 12.5C6.00825 12.5 7.49992 13.9917 7.49992 15.8333Z"
        stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.4096 15.8162H2.92627" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round" />
      <path d="M4.1665 14.5996V17.0913" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round" />
      <path
        d="M18.3334 10V14.1667C18.3334 16.6667 16.6667 18.3333 14.1667 18.3333H6.35842C6.61675 18.1167 6.84175 17.85 7.01675 17.55C7.32508 17.05 7.50008 16.4583 7.50008 15.8333C7.50008 13.9917 6.00841 12.5 4.16675 12.5C3.16675 12.5 2.27508 12.9417 1.66675 13.6333V10C1.66675 7.73333 3.03341 6.15 5.15841 5.88333C5.37508 5.85 5.60008 5.83333 5.83341 5.83333H14.1667C14.3834 5.83333 14.5917 5.84166 14.7917 5.87499C16.9417 6.12499 18.3334 7.71667 18.3334 10Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M18.3334 10.4167H15.8334C14.9167 10.4167 14.1667 11.1667 14.1667 12.0833C14.1667 13 14.9167 13.75 15.8334 13.75H18.3334"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default WalletAdd;
