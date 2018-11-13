import * as React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  submitText: string;
  children: React.ReactNode;
  isSubmitActive: boolean;
  onClose(): void;
  onSubmit?(): void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  submitText,
  isSubmitActive
}) => (
  <div
    style={{ textAlign: 'left' }}
    className={`modal has-text-dark ${isOpen ? 'is-active' : ''}`}
  >
    <div className="modal-background" onClick={onClose} />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button className="delete" aria-label="close" onClick={onClose} />
      </header>
      <section className="modal-card-body body">{children}</section>
      <footer
        className="modal-card-foot"
        style={{ justifyContent: 'flex-end' }}
      >
        <button className="button" onClick={onClose}>
          Cancel
        </button>
        {onSubmit && (
          <button
            disabled={!!isSubmitActive}
            className="button is-success"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            {submitText}
          </button>
        )}
      </footer>
    </div>
    <button className="modal-close is-large" aria-label="close" />

    <style jsx>{`
      .body {
        padding: 0;
      }
    `}</style>
  </div>
);

export default Modal;
