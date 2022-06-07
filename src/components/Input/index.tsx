import classNames from 'classnames';
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { useField } from 'formik';

interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputTypes> = (
  { label, required, ...props },
  ref,
) => {
  const [field, meta] = useField(props as any);
  return (
    <>
      <label
        htmlFor={props.name}
        className={classNames('block text-sm font-medium text-gray-700', {
          "after:content-['*'] after:ml-0.5 after:text-red-500": required,
        })}
      >
        {label}
      </label>
      <input
        type="text"
        id={props.name}
        className={classNames(
          'mt-1 disabled:bg-slate-50  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
          {
            'border-red-500': meta.touched && meta.error,
            'border-green-500': meta.touched && !meta.error,
          },
        )}
        ref={ref}
        {...field}
        {...props}
      />
      {(typeof meta.error === 'string' ||
        (meta.error as any) instanceof String) &&
        meta.touched && (
          <p className="ml-2 mt-1 text-sm text-red-500">{meta.error}</p>
        )}
    </>
  );
};

const Input = forwardRef(InputBase);
export default Input;
