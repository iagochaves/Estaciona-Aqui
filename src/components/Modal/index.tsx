import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onScheduleConfirmation: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  onScheduleConfirmation,
}) => {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter="transition ease-in-out duration-200 transform"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition ease-in-out duration-200 transform"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen h-full text-center">
          <Dialog.Overlay className="fixed inset-0 bg-opacity-75 transition-opacity backdrop-blur-sm" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full h-5/6 p-6 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl rounded-t-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Payment successful
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                onClick={() => onScheduleConfirmation()}
              >
                Locate
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
