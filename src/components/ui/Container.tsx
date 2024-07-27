import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ className, children }: Props) => {
  return (
    <div
      className={`container mx-auto px-6 lg:px-16 2xl:px-6 xl:max-w-[1380px] ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
