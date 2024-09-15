import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

export default function Modal({ children, open }: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className="bg-transparent bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center"
    >
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
}
