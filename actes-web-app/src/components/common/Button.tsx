import React from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  [x:string]: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  className,
  ...rest
}) => {

  // classes
  const classes = twMerge(
    classNames('border flex items-center', {
      'opacity-50 cursor-not-allowed': disabled
    }, className)
  );

  return (
    <button 
      {...rest} 
      disabled={disabled} 
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
