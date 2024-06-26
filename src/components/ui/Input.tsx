import * as React from 'react';


export interface IInputProps {
}

const Input: React.FC<IInputProps> = props => {
  return <input placeholder="0.0" className="border-primary pl-4 text-2xl w-1/2 rounded-xl py-2" />;
};
export default Input;
