import classNames from 'classnames';
import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
