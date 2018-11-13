import {
  Button,
  Delete,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardTitle,
  ModalClose
} from 'bloomer';
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

const ModalComponent: React.FunctionComponent<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  submitText,
  isSubmitActive
}) => (
  <Modal
    isActive={isOpen}
    style={{ textAlign: 'left' }}
    className="has-text-dark"
  >
    <ModalBackground onClick={onClose} />
    <ModalCard>
      <ModalCardHeader>
        <ModalCardTitle>{title}</ModalCardTitle>
        <Delete onClick={onClose} />
      </ModalCardHeader>
      <ModalCardBody className="palette-modal-body">{children}</ModalCardBody>
      <ModalCardFooter style={{ justifyContent: 'flex-end' }}>
        <Button onClick={onClose}>Cancel</Button>
        {onSubmit && (
          <Button
            isColor="success"
            disabled={!!isSubmitActive}
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            {submitText}
          </Button>
        )}
      </ModalCardFooter>
    </ModalCard>
    <ModalClose onClick={onClose} />

    <style jsx>{`
      :global(.palette-modal-body) {
        padding: 0;
      }
    `}</style>
  </Modal>
);

export default ModalComponent;
