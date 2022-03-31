import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import createWrapperAndAppendToBody from '../../utils/createWrapperAndAppendToBody';

type ReactPortalProps = {
  children: ReactNode;
  wrapperId: string;
};

const ReactPortal: React.FC<ReactPortalProps> = ({
  children,
  wrapperId = 'react-portal-wrapper',
}) => {
  const [wrapperElement, setWrapperElement] = useState<Element>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
};

export default ReactPortal;
