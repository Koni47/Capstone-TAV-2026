import React, { createContext, useContext, useState, ReactNode } from 'react';

const TooltipContext = createContext<{
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
} | null>(null);

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const Tooltip = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <TooltipContext.Provider value={{ isVisible, setIsVisible }}>
      <div className="relative inline-flex items-center justify-center">{children}</div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({
  children,
  asChild = false,
}: {
  children: ReactNode;
  asChild?: boolean;
}) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipTrigger must be used within a Tooltip');

  const { setIsVisible } = context;

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      // @ts-expect-error - Cloned element interception
      onMouseEnter: (e: React.MouseEvent) => {
        handleMouseEnter();
        // @ts-expect-error - Cloned element interception
        if (children.props.onMouseEnter) children.props.onMouseEnter(e);
      },
      // @ts-expect-error - Cloned element interception
      onMouseLeave: (e: React.MouseEvent) => {
        handleMouseLeave();
        // @ts-expect-error - Cloned element interception
        if (children.props.onMouseLeave) children.props.onMouseLeave(e);
      },
    });
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
      {children}
    </div>
  );
};

export const TooltipContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipContent must be used within a Tooltip');

  const { isVisible } = context;

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
      {children}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
    </div>
  );
};
