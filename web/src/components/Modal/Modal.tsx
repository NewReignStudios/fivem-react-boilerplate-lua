import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  locked?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, locked, onClose, children }: ModalProps) {
  const modalRef = useRef(null as HTMLDialogElement | null);

  // work out which classes should be applied to the dialog element
  const dialogClasses = useMemo(() => {
    const _arr = [styles['modal']];
    if (!open) _arr.push(styles['modal--closing']);

    return _arr.join(' ');
  }, [open]);

  // Eventlistener: trigger onclose when cancel detected
  const onCancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (!locked && onClose) onClose();
    },
    [locked, onClose]
  );

  // Eventlistener: trigger onclose when click outside
  const onClick = useCallback(
    // ({ target }: React.MouseEvent) => {
    (e: React.MouseEvent) => {
      console.log(e);
      const { current: el } = modalRef;
      if (e.target === el && !locked && onClose) onClose();
    },
    [locked, onClose]
  );

  // Eventlistener: trigger close click on anim end
  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open && el) el.close();
  }, [open]);

  // when open changes run open/close command
  useEffect(() => {
    const el = modalRef.current;
    if (open && el) el.showModal();
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onMouseDown={onClick}
      onAnimationEnd={onAnimEnd}
    >
      {/* <div className={styles["modal__container"]}>{children}</div> */}
      {children}
    </dialog>
  );
}
