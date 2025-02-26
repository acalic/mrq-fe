import React from 'react';

type AnimatedContainerProps = {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
};

const AnimatedContainer = React.memo(({ className, onClick, children }: AnimatedContainerProps) => (
  <div onClick={onClick} className={className}>
    {children}
  </div>
));

AnimatedContainer.displayName = 'AnimatedContainer';

export default AnimatedContainer;