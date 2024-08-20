import { createPortal } from 'react-dom';

interface ModalPortalProps extends React.PropsWithChildren {}

function ModalPortal({ children }: ModalPortalProps) {
  const el = document.getElementById('modal');
  if (!el) return null;

  return createPortal(children, el);
}

export default ModalPortal;
