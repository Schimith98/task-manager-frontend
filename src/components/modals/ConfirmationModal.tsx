import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useModal } from '../../contexts/ModalContext';

type Props = {
  label: string;
  handleConfirmation: () => void;
}

const ConfirmationModal: React.FC<Props> = ({ label, handleConfirmation }) => {
  const { closeModal } = useModal()

  const handleClose = () => {
    closeModal()
  }

  const onConfirm = () => {
    handleConfirmation()
    handleClose()
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">Confirmação</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {label}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;