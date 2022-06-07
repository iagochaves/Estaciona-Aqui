import { CheckIcon, XIcon } from '@heroicons/react/outline';

type SucessToastProps = {
  message: string;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
};

const SuccessToast: React.FC<SucessToastProps> = ({
  isActive,
  message,
  setIsActive,
}) => {
  return (
    <>
      {isActive && (
        <div className="absolute bottom-0 right-6">
          <div
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-green-50 rounded-lg shadow"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 text-green-500 ">
              <CheckIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <button
              type="button"
              className="ml-auto  text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 inline-flex"
              data-dismiss-target="#toast-success"
              aria-label="Close"
              onClick={() => setIsActive(false)}
            >
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessToast;
